import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToStream,
} from "@react-pdf/renderer";
import type { LoaderFunctionArgs, LoaderFunction } from "@remix-run/node";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  // you can get any data you need to generate the PDF inside the loader
  // however you want, e.g. fetch an API or query a DB or read the FS
  //   let data = await getDataForThePDFSomehow({ request, params });

  // render the PDF as a stream so you do it async
  const stream = await renderToStream(<MyDocument />);

  // and transform it to a Buffer to send in the Response
  const body: Buffer = await new Promise((resolve, reject) => {
    const buffers: Uint8Array[] = [];
    stream.on("data", (data) => {
      buffers.push(data);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    stream.on("error", reject);
  });

  // finally create the Response with the correct Content-Type header for
  // a PDF
  const headers = new Headers({ "Content-Type": "application/pdf" });
  return new Response(body, { status: 200, headers });
};

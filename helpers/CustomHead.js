import React from "react";
import Head from "next/head";

const CustomHead = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <link rel='icon' href='/favicon.ico' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, minimum-scale=1'
      />
      <meta
        name='keywords'
        content='bilete,avion,turism,tickets,airplane,aeroport'
      />
      <link
        rel='stylesheet'
        href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
      />
      <meta name='description' content='bilete de avion' />
      {props.leafletMap ? (
        <>
          <link
            rel='stylesheet'
            href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
            integrity='sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=='
            crossorigin=''
          />
          <script
            src='https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
            integrity='sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=='
            crossorigin=''
          ></script>
        </>
      ) : null}
    </Head>
  );
};
export default CustomHead;

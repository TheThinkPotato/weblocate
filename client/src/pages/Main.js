// WebLocate API Masshup
// Assignment 1 Client for the QUT CAB432 Cloud Computing Unit
// By Daniel Lopez - Student ID: n10956611
// Code has been adapted from the Web Computing Unit at QUT CAB230
// Also, Spinner Code adapted from https://contactmentor.com/how-to-add-loading-spinner-react-js/

import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import Info from "../components/Info";
import Pmap from "../components/Pmap";
import { searchDNS, searchIP, updateCounter } from "../data/apiCalls";

export default function Main() {
  const [keynum, setKeynum] = useState(0);
  const [data, setData] = useState();
  const [dnsAddress, setDnsAddress] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [isLoadingDomain, setIsLoadingDomain] = useState(false);
  const [isLoadingIP, setIsLoadingIP] = useState(false);
  const [pageCounter, setPageCounter] = useState("...");

  const inputCleanUp = (searchAddress) => {
    // if searchAddress https:// remove it ...
    if (searchAddress.includes("https://")) {
      searchAddress = searchAddress.replace("https://", "");
    }
    if (searchAddress.includes("http://")) {
      searchAddress = searchAddress.replace("http://", "");
    }
    if (searchAddress.includes("ftp://")) {
      searchAddress = searchAddress.replace("ftp://", "");
    }
    // if searchAddress has a / split it and take the first part
    if (searchAddress.includes("/")) {
      searchAddress = searchAddress.split("/")[0];
    }
    // if searchAddress has a : split it and take the first part
    if (searchAddress.includes(":")) {
      searchAddress = searchAddress.split(":")[0];
    }

    return searchAddress;
  };

  const handleFetch = (type) => {
    if (type === "domain") {
      const searchAddress = inputCleanUp(dnsAddress);
      setDnsAddress(searchAddress);
      setIsLoadingDomain(true);
      searchDNS(searchAddress).then((resp) => {
        setData(resp.data);
        setIsLoadingDomain(false);
      });
    } else {
      const searchAddress = inputCleanUp(ipAddress);
      setIpAddress(searchAddress);
      setIsLoadingIP(true);
      searchIP(searchAddress).then((resp) => {
        setData(resp.data);
        setIsLoadingIP(false);
      });
    }
  };

  useEffect(() => {
    setKeynum((keynum) => {
      return keynum + 1;
    });
  }, [data]);

  useEffect(() => {
    updateCounter().then((resp) => {
      setPageCounter(resp.data.pageviews);
    });
  }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="container">
        <div className="main-window">
          <div className="aside">
            <img src="logo-small.jpg" alt="logo" className="img-aside" />
            <h1>Enter Details</h1>
            <form>
              <label>Domain Look up:</label>
              <input
                id="dns-input"
                name="ipAddress"
                value={dnsAddress}
                onChange={(e) => setDnsAddress(e.target.value)}
              />
              <br />
              <Button
                className="side-bar-button"
                disabled={isLoadingDomain}
                onClick={() => {
                  handleFetch("domain");
                }}
              >
                {!!isLoadingDomain && (
                  <div className="button-container">
                    <div className="button-text">
                      <p>Search Domain</p>
                      <div className="spinner">
                        <i className="fa fa-circle-o-notch fa-spin"></i>
                      </div>
                    </div>
                  </div>
                )}

                {!isLoadingDomain && (
                  <div className="button-container">
                    <div className="button-text">
                      <p>Search Domain</p>
                      <div className="spinner"></div>
                    </div>
                  </div>
                )}
              </Button>

              <label>IP Look up:</label>
              <br />
              <input
                id="ip-input"
                name="ipAddress"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
              />
              <Button
                disabled={isLoadingIP}
                className="side-bar-button"
                onClick={() => {
                  handleFetch("ip");
                }}
              >
                {!!isLoadingIP && (
                  <div className="button-container">
                    <div className="button-text">
                      <p>Search IP</p>
                      <div className="spinner">
                        <i className="fa fa-circle-o-notch fa-spin"></i>
                      </div>
                    </div>
                  </div>
                )}

                {!isLoadingIP && (
                  <div className="button-container">
                    <div className="button-text">
                      <p>Search IP</p>
                      <div className="spinner"></div>
                    </div>
                  </div>
                )}
              </Button>
            </form>
            <div>
              <p className="counter">Page Views: {pageCounter}</p>
            </div>
          </div>
          {!!data && (
            <div className="box-window box-border">
              <div className="box-info box-border">
                <Info data={data} key={keynum} />
              </div>
              <div>
                <Pmap data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: "2rem" }}></div>
    </div>
  );
}

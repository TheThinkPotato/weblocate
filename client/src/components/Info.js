import React, { useEffect } from "react";

function curentTime(dateTimeIn) {
  const localDate = dateTimeIn.split("T")[0];
  const localTime = dateTimeIn.split("T")[1];
  const localHrs = localTime.split(".")[0];
  return { localDate, localHrs };
}

function setScamColor(scam) {
  if (scam === true) {
    return "red";
  } else {
    return "#4caf50";
  }
}

const Info = (props) => {
  const { data } = props;

  let scamColor = "#white";
  let scamCheck = "No data";

  if (data.phishingCheck !== undefined) {
    scamCheck = data.phishingCheck.isScam ? " - Danger Scam Site! - " : "OK";
    scamColor = setScamColor(data.phishingCheck.isScam);
  }

  useEffect(() => {
    //render
  }, []);

  useEffect(() => {
    //rerender
  }, [data]);

  if (data.error) {
    return (
      <div className="info-heading">
        <h2>{data.message}</h2>
        <p className="info-heading">
          Please check your input details and try again.
        </p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const time = curentTime(data.localTime.datetime);

  return (
    <div className="">
      <h2 className="info-heading">{data.search.searchDomain}</h2>
      <h3 className="info-sub-heading">{data.ipGeoInfo.hostname}</h3>
      <div className="info-container">
        <div className="info-table">
          <table>
            <thead>
              <tr>
                <td>
                  <h3>Host Info</h3>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h4>IP:</h4>
                </td>
                <td>
                  <p>{data.ipGeoInfo.ip}</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>Country:</h4>
                </td>
                <td>
                  <p>{data.ipGeoInfo.country}</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>Region:</h4>
                </td>
                <td>
                  <p>{data.ipGeoInfo.region}</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>City:</h4>
                </td>
                <td>
                  <p>{data.ipGeoInfo.city}</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>Post Code:</h4>
                </td>
                <td>
                  <p>{data.ipGeoInfo.postal}</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>Time Zone:</h4>
                </td>
                <td>
                  <p>{data.ipGeoInfo.timezone}</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>Local Time:</h4>
                </td>
                <td>
                  <p>
                    {time.localHrs} {data.localTime.abbreviation}
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>Local Date:</h4>
                </td>
                <td>
                  <p>{time.localDate}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="business-table">
          <table>
            <thead>
              <tr>
                <td>
                  <h3>Business Info</h3>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h4>Company Name:</h4>
                </td>
                <td>
                  <p>{data.businessInfo.name}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Other Name:</h4>
                </td>
                <td>
                  <p>{data.businessInfo.parent_name}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Company Status:</h4>
                </td>
                <td>
                  <p>{data.businessInfo.company_status}</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>Address:</h4>
                </td>
                <td>
                  <p>{data.businessInfo.address1}</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>City:</h4>
                </td>
                <td>
                  <p>{data.businessInfo.city}</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>State:</h4>
                </td>
                <td>
                  <p>{data.businessInfo.state}</p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>Country:</h4>
                </td>
                <td>
                  <p>
                    {data.businessInfo.country}{" "}
                    {data.businessInfo.iso_country_code}{" "}
                  </p>
                </td>
              </tr>

              <tr>
                <td>
                  <h4>Post Code:</h4>
                </td>
                <td>
                  <p>{data.businessInfo.zip}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="info-scam-message" style={{ backgroundColor: scamColor }}>
        <p>
          Scam Check: {data.domain} {scamCheck}
        </p>
      </div>
    </div>
  );
};

export default Info;

const PORT = "";
const URL = "" + PORT;
const SEARCH_DNS_URL = URL + "/search/Domain/";
const SEARCH_IP_URL = URL + "/search/IP/";
const UPDATE_COUNTER_URL = URL + "/counter/update";

export function searchDNS(searchTerm) {
  return fetch(SEARCH_DNS_URL + searchTerm)
    .then((res) => res.json())
    .then((data) => {
      return { data };
    });
}

export function searchIP(searchTerm) {
  return fetch(SEARCH_IP_URL + searchTerm)
    .then((res) => res.json())
    .then((data) => {
      return { data };
    });
}

export function updateCounter() {
  return fetch(UPDATE_COUNTER_URL)
    .then((res) => res.json())
    .then((data) => {      
      return { data };      
    });
}

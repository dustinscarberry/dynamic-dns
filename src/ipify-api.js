export const getPublicIP = async () => {
  try {
    // get current ip
    const rsp = await fetch('https://api.ipify.org?format=json');

    if (!rsp.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await rsp.json();
    return data.ip;
  } catch (err) {
    throw err;
  }
}

export default { getPublicIP }
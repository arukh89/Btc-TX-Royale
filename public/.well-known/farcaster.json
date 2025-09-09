const HUB = 'https://hub.pinata.cloud';
export async function userFromSig(signedMsg) {
  if (!signedMsg) return null;
  try {
    const r = await fetch(`${HUB}/v1/validateMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: Buffer.from(signedMsg.replace(/^0x/, ''), 'hex')
    });
    if (!r.ok) return null;
    const msg = await r.json();
    const fid = msg.data.fid;
    const prof = await fetch(`${HUB}/v1/userDataByFid?fid=${fid}`).then(r => r.json());
    const out = { fid };
    prof.data?.userDataBody?.forEach(u => {
      if (u.type === 'USER_DATA_TYPE_USERNAME') out.username = u.value;
      if (u.type === 'USER_DATA_TYPE_DISPLAY') out.displayName = u.value;
      if (u.type === 'USER_DATA_TYPE_PFP') out.avatar = u.value;
    });
    return out;
  } catch { return null; }
}

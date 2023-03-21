import { TIMER_SEC } from './config';

const timer = (sec) => {
  return new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error(`Request took too long! Timeout after ${sec} second`)),
      sec * 1000
    );
  });
};

export const fetchRequest = async (url, uploadData = undefined) => {
  try {
  const fetchType = uploadData
  ? fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadData),
  })
  : fetch(url);

    const res = await Promise.race([fetchType, timer(TIMER_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
}


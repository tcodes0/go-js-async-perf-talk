/* eslint-disable no-console */
const crypto = (await import('crypto')).default;

export function load() {
  return new Promise<void>((resolve, reject) => {
    const salt =
      'Gg8au1BBLgE1MGQGiRULunMqOCoJvhHA3qXhr3FFn+Z7iWiLMmNI6j+JIcd6ledP';
    return crypto.pbkdf2('myPassword', salt, 50000, 512, 'sha512', (err, _key) => {
        if (err) reject(err);
        else resolve();
      },
    );
  });
}

function routine(isCancelled: () => boolean, job: number) {
  if (isCancelled()) {
    console.log('cancelled: ', job);
    return Promise.resolve();
  }
  console.log('work: ', job);
  return load().then(() => console.log('done: ', job));
}

function processor(
  isCancelled: () => boolean,
  _cancel: () => void,
  jobs: number[],
) {
  console.time('processor');
  let promises: Promise<void>[] = [];

  jobs.forEach((job, i) => {
    const promise = routine(isCancelled, job);
    promises.push(promise);
  });

  return Promise.all(promises).then(() => console.timeEnd('processor'));
}

export async function main() {
  const jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  let _cancelled = false;
  const cancel = () => {
    _cancelled = true;
  };
  const getCancel = () => _cancelled;
  await processor(getCancel, cancel, jobs);
}

main();

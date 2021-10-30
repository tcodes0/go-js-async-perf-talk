/* eslint-disable no-console */
export function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function routine(isCancelled: () => boolean, job: number) {
  return new Promise<void>(async (resolve) => {
    if (isCancelled()) {
      console.log('cancelled: ', job);
      return resolve();
    }
    console.log('work: ', job);
    await sleep(1000);
    console.log('done: ', job);
    return resolve();
  });
}

function processor(
  isCancelled: () => boolean,
  cancel: () => void,
  jobs: number[],
) {
  console.time('processor');
  let promises: Promise<void>[] = [];

  jobs.forEach((job, i) => {
    if (i === 10) cancel();
    // what happens with await below? :)
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

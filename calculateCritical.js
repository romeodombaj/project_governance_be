const calculateCriticalPath = async (originalArray) => {
  let activityArray = JSON.parse(JSON.stringify(originalArray));

  let doneArray = [];

  let currentDuration = 0;

  const early = await calculateEarlyTimes(
    activityArray,
    doneArray,
    currentDuration
  );

  activityArray = early.activityArray;
  doneArray = early.doneArray;
  currentDuration = early.currentDuration;

  const late = await calculateLateTimes(
    activityArray,
    doneArray,
    currentDuration
  );

  activityArray = late.activityArray;
  doneArray = late.doneArray;
  currentDuration = late.currentDuration;

  return activityArray;
};

/// FORWARDS

const calculateEarlyTimes = async (
  activityArray,
  doneArray,
  currentDuration
) => {
  const length = activityArray.length;
  // after first

  for (let n = 0; n < length; n++) {
    doneArray.push(...(await findFirst(activityArray, currentDuration)));
    const comparableTime = await maxDuration(doneArray);
    activityArray = await filterArray(activityArray, doneArray);
    activityArray = await next(activityArray, doneArray);
    currentDuration = await comparableTime;
  }

  return { activityArray, doneArray, currentDuration };
};

/// BACKWARDS

const calculateLateTimes = async (
  activityArray,
  doneArray,
  currentDuration
) => {
  while (doneArray.length > 0) {
    const maxEarlyTime = await maxStartTime(doneArray);

    activityArray.push(
      ...(await findLast(doneArray, maxEarlyTime, currentDuration))
    );

    const maxDur = await maxDuration(doneArray);
    doneArray = await filterArray(doneArray, activityArray);
    currentDuration = await maxEarlyTime;
  }

  return { activityArray, doneArray, currentDuration };
};

/// OTHERS

const findFirst = (activityArray, currentDuration) => {
  let first = [];

  for (let i = 0; i < activityArray.length; i++) {
    if (activityArray[i].predecessors.length === 0) {
      activityArray[i] = {
        ...activityArray[i],
        earlyStartTime: currentDuration,
        earlyFinishTime: currentDuration + activityArray[i].duration,
      };
      first.push(activityArray[i]);
    }
  }
  return first;
};

const maxDuration = (array) => {
  let max = array[0].earlyFinishTime;
  for (let i = 1; i < array.length; i++) {
    if (array[i].earlyFinishTime > max) {
      max = array[i].earlyFinishTime;
    }
  }
  return max;
};

const maxStartTime = (array) => {
  let max = array[0].earlyStartTime;
  for (let i = 1; i < array.length; i++) {
    if (array[i].earlyStartTime > max) {
      max = array[i].earlyStartTime;
    }
  }
  return max;
};

const filterArray = (array, filter) => {
  for (let x in filter) {
    array = array.filter((el) => el.i !== filter[x].i);
  }

  return array;
};

const next = (array, filter) => {
  for (let y in filter) {
    for (let x in array) {
      array[x].predecessors = array[x].predecessors.filter(
        (el) => el !== filter[y].i
      );
    }
  }
  return array;
};

/// last

const findLast = (array, maxEarlyTime, maxDuration) => {
  let last = [];
  for (let x in array) {
    if (array[x].earlyStartTime === maxEarlyTime) {
      array[x] = {
        ...array[x],
        lastStartTime: maxDuration - array[x].duration,
        lastFinishTime: maxDuration,
        deltaFinish: maxDuration - array[x].earlyFinishTime,
      };
      last.push(array[x]);
    }
  }

  /*let criticalPath = Math.min(...last.map((el) => el.deltaFinish));
  console.log("CRIT");
  console.log(criticalPath);*/

  return last;
};

// critical path calculation
const criticalPath = (array) => {};

module.exports = {
  calculateCriticalPath: calculateCriticalPath,
};

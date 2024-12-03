import * as fs from "fs/promises"; // Use a versão baseada em promises do fs

let arrLeft = [];
let arrRight = [];
let arrResult = [];

async function readFileTxtAndReturnResult() {
  try {
    let data = await fs.readFile("listas.txt", "utf-8");

    data = data.replaceAll("   ", ",");

    const lines = data.split("\r\n");
    for (const element of lines) {
      const arr = element.split(",");
      arrLeft.push(Number(arr[0]));
      arrRight.push(Number(arr[1]));
    }
  } catch (err) {
    console.error("Erro ao ler o arquivo:", err);
  }
}
function organizeArrays(arrLeft, arrRight) {
  arrLeft.sort((a, b) => a - b);
  arrRight.sort((a, b) => a - b);
}

function normalization(arrRight, arrLeft) {
  for (let index = 0; index < arrLeft.length; index++) {
    let arrCount = 0;
    if (arrRight.includes(arrLeft[index])) {
      arrCount = arrRight.filter((x) => arrLeft[index] == x).length;
    }
    arrResult.push(arrLeft[index] * arrCount);
  }
}

function returnDistance(arrLeft, arrRight) {
  for (let i = 0; i < arrLeft.length; i++) {
    arrResult.push(Math.abs(arrLeft[i] - arrRight[i]));
  }
  let result = 0;
  arrResult.map((x) => {
    result += x;
  });
  return result;
}

function similarity(arrLeft) {
  console.log(arrResult);
  const initialValue = 0;
  const sumWithInitial = arrResult.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  return sumWithInitial
}
async function main() {
  await readFileTxtAndReturnResult();
  normalization(arrRight, arrLeft);
  organizeArrays(arrLeft, arrRight);

  console.log(similarity(arrLeft));
}
main();

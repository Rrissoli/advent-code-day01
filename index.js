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
  let count = 0;
  for (let index = 0; index < arrLeft.length; index++) {
    arrRight.map((y) => {
      if (arrLeft[index] === y) {
        console.log(arrLeft[index], y);

        count++;
      }
    });
    arrLeft[index] = arrLeft[index] * count;
    count = 0;
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

async function main() {
  await readFileTxtAndReturnResult();
  organizeArrays(arrLeft, arrRight);
  normalization(arrRight, arrLeft);
  console.log(returnDistance(arrLeft, arrRight));
}
main();

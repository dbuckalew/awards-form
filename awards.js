const reMemberId = /^RMN-[0-9]{4}-[0-9]{2}$/i;

var nominees = []

function addNomineeElement(part, data) {
  nomineesEle = document.getElementById('nominees');
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode(data);
  newDiv.appendChild(newContent);
  nomineesEle.appendChild(newDiv);
}

function drawNominees() {
  console.log("Drawing nominees...");
  nomineesEle = document.getElementById('nominees');
  nomineesEle.textContent = '';

  for(let i=0; i<nominees.length; i++) {
    console.log(nominees[i]);
    const removeImg = document.createElement("img");
    removeImg.setAttribute("src", "remove.svg");
    removeImg.setAttribute("class", "subtract");
    removeImg.setAttribute("onclick", `removeNominee(${i})`);
    addNomineeElement('memberId', nominees[i].member_id);
    addNomineeElement('memberName', nominees[i].member_name);
    addNomineeElement('memberBranch', nominees[i].member_branch);
    addNomineeElement('memberAward', nominees[i].award);
    // addNomineeElement('memberRemove', removeImg);
    nomineesEle.appendChild(removeImg);
  }
}

function addNominee() {
  console.log("Adding nominee...")

  const nomineeNameEle = document.getElementById('nominee_name');
  const nomineeBranchEle = document.getElementById('nominee_branch');
  const nomineeIdEle = document.getElementById('nominee_id');
  const nomineeAwardEle = document.getElementById('nominee_award');
  const nominationTextEle = document.getElementById('nomination_text');

  nominees.push({
    member_id: nomineeIdEle.value.toUpperCase(), 
    member_name: nomineeNameEle.value, 
    member_branch: nomineeBranchEle.value, 
    award: nomineeAwardEle.value.toUpperCase(),
    text: nominationTextEle.value
  });

  nomineeNameEle.value = '';
  nomineeBranchEle.value = '';
  nomineeIdEle.value = '';
  nomineeAwardEle.value = '';
  nominationTextEle.value = '';
  nomineeIdEle.focus();

  drawNominees();
}

function setNominatorInfo(d) {
  const nominatorNameEle = document.getElementById('nominator_name');
  const nominatorBranchEle = document.getElementById('nominator_branch');

  nominatorNameEle.value = `${d.first_name} ${d.last_name}`;
  nominatorBranchEle.value = d.branch;
}

function checkNominatorId() {
  const idEle = document.getElementById('nominator_id');
  if (reMemberId.test(idEle.value)) {
    console.log(idEle.value);
    fetch(`http://localhost:8080/member/${idEle.value.toUpperCase()}`, {
      mode: 'cors'
    })
      .then((d) => d.json())
      .then((d) => setNominatorInfo(d[0]))
  }
}

function setNomineeInfo(d) {
  const nomineeNameEle = document.getElementById('nominee_name');
  const nomineeBranchEle = document.getElementById('nominee_branch');

  nomineeNameEle.value = `${d.first_name} ${d.last_name}`;
  nomineeBranchEle.value = d.branch;
}

function checkMemberId() {
  const idEle = document.getElementById('nominee_id');
  if (reMemberId.test(idEle.value)) {
    console.log(idEle.value);
    fetch(`http://localhost:8080/member/${idEle.value.toUpperCase()}`, {
      mode: 'cors'
    })
      .then(d => d.json())
      .then(d => setNomineeInfo(d[0]))
  }
}

function awardInput(e) {
  if(e.keyCode === 13){
    e.preventDefault(); // Ensure it is only this code that runs
    addNominee();
  }
}

function removeNominee(row) {
  console.log("Removing " + row);
  nominees.splice(row, 1);
  drawNominees();
}

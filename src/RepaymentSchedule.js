const repaymentSchedule = function (principal, interest, repayment) {
  interest = interest / 100.0 / 12;
  const rows = [];
  if (principal && interest && repayment) {
    let month = 1;
    while (principal > 0.01 && month < 600) {
      const interestCharged = (principal - 0) * interest;
      repayment = Math.min(repayment, principal + interestCharged);
      const closing = Math.max(0.00, principal - repayment + interestCharged);
      rows.push([month, principal, interestCharged, repayment, closing]);
      principal = closing;
      month += 1;
    }
  }
  return rows;
};

export default repaymentSchedule;
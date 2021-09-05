window.addEventListener("DOMContentLoaded", (event) => {
    const text = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    text.addEventListener("input", function () {
      if (text.value.length == 0) {
        textError.textContent = "";
        return;
      }
      try {
        new EmployeePayrollData().name = text.value;
        textError.textContent = "";
      } catch (e) {
        textError.textContent = e;
      }
    });
    function checkFulldate(fulldate) {
      try {
        new EmployeePayrollData().startDate = fulldate;
        dateError.textContent = "";
      } catch (error) {
        dateError.textContent = error;
      }
    }
    const day = document.querySelector("#day");
    const month = document.querySelector("#month");
    const year = document.querySelector("#year");
    const dateError = document.querySelector(".date-error");
    day.addEventListener("change", function () {
      let fulldate = day.value + " " + month.value + " " + year.value;
      checkFulldate(fulldate);
    });
    month.addEventListener("change", function () {
      let fulldate = day.value + " " + month.value + " " + year.value;
      checkFulldate(fulldate);
    });
    year.addEventListener("change", function () {
      let fulldate = day.value + " " + month.value + " " + year.value;
      checkFulldate(fulldate);
    });
  
    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener("input", function () {
      output.textContent = salary.value;
    });
  });
  
  const save = () => {
    try {
      let employeePayrollData = createEmployeePayroll();
      createAndUpdateStrorage(employeePayrollData);
    } catch (e) {
      console.log(e);
      return;
    }
  };
  
  function createAndUpdateStrorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(
      localStorage.getItem("EmployeePayrollList")
    );
  
    if (employeePayrollList != undefined) {
      employeePayrollList.push(employeePayrollData);
    } else {
      employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem(
      "EmployeePayrollList",
      JSON.stringify(employeePayrollList)
    );
  }
  
  const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    employeePayrollData.id = new Date().getTime();
    try {
      employeePayrollData.name = getInputValueById("#name");
    } catch (e) {
      setTextValue(".text-error", e);
      throw e;
    }
    employeePayrollData.profilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.department = getSelectedValues("[name=department]");
    employeePayrollData.salary = getInputValueById("#salary");
    employeePayrollData.note = getInputValueById("#notes");
    let date =
      getInputValueById("#day") +
      " " +
      getInputValueById("#month") +
      " " +
      getInputValueById("#year");
    employeePayrollData.startDate = new Date(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
  };
  
  const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
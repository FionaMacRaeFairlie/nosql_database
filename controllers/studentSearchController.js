const studentDatabase = require("../models/studentModel");
const db = new studentDatabase("database/student.db");

//  db.init();

function restructureData(subject, list) {
  const subjectList = list.map(function (item) {
    const newList = {};
    newList.student = item.student;
    for (var i = 0; i < item.modules.length; i++) {
      if (item.modules[i].name == subject) {
        newList.subject = item.modules[i].name;
        newList.grade = item.modules[i].grade;
      }
    }
    return newList;
  });
  return subjectList;
}

exports.landing_page = function (req, res) {
  db.displayAll()
    .then((list) => {
      res.render("studentex", {
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.web_development = function (req, res) {
  const subject = "Web Development";
  db.displayWebDev()
    .then((list) => {
      res.render("classList", {
        title: subject,
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.low_performance = function (req, res) {
  db.displayLowPerformance()
    .then((list) => {
      res.render("performance", {
        title: "Students with poor performance",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.fail_programming = function (req, res) {
  const subject = "Programming";
  db.displayFail(subject)
    .then((list) => {
    const subjectList=  restructureData(subject, list);
      res.render("subjectPerformance", {
        title: subject,
        entries: subjectList,
        status:"fail"
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.fail_se = function (req, res) {
  const subject = "Software Engineering";
  db.displayFail(subject)
    .then((list) => {
    const subjectList=  restructureData(subject, list);
      res.render("subjectPerformance", {
        title: subject,
        entries: subjectList,
        status:"fail"
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.fail_webdev = function (req, res) {
  const subject = "Web Development";
  db.displayFail(subject)
    .then((list) => {
    const subjectList=  restructureData(subject, list);
      res.render("subjectPerformance", {
        title: subject,
        entries: subjectList,
        status:"fail"
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.pass_programming = function (req, res) {
  const subject = "Programming";
  db.displayPass(subject)
    .then((list) => {
      const subjectList=  restructureData(subject, list);
      res.render("subjectPerformance", {
        title: subject,
        entries: subjectList,
        status:"pass"
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.pass_se = function (req, res) {
  const subject = "Software Engineering";
  db.displayPass(subject)
    .then((list) => {
    const subjectList=  restructureData(subject, list);
      res.render("subjectPerformance", {
        title: subject,
        entries: subjectList,
        status:"pass"
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.pass_webdev = function (req, res) {
  const subject = "Web Development";
  db.displayPass(subject)
    .then((list) => {
    const subjectList=  restructureData(subject, list);
      res.render("subjectPerformance", {
        title: subject,
        entries: subjectList,
        status:"pass"
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};




exports.pass_aadp = function (req, res) {
  const subject = "Application Architectures";
  db.displayPass(subject)
    .then((list) => {
      const subjectList=  restructureData(subject, list);
      res.render("subjectPerformance", {
        title: subject,
        entries: subjectList,
        status:"pass"
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
exports.fail_aadp = function (req, res) {
  const subject = "Application Architectures";
  db.displayFail(subject)
    .then((list) => {
    const subjectList=  restructureData(subject, list);
      res.render("subjectPerformance", {
        title: subject,
        entries: subjectList,
        status:"fail"
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.application_arch = function (req, res) {
  const subject = "Application Architectures";
  db.displayAppArch()
    .then((list) => {
      res.render("classList", {
        title: subject,
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

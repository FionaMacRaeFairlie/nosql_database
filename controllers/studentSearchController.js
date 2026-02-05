// controllers/studentController.js (ES Modules)

import StudentDatabase from "../models/studentModel.js";
const db = new StudentDatabase("database/student.db");

// ---------------- Helper: restructure data ----------------

const restructureData = (subject, list) =>
  list.map((item) => {
    const newEntry = { student: item.student };
    const match = Array.isArray(item.modules)
      ? item.modules.find((m) => m?.name === subject)
      : undefined;

    if (match) {
      newEntry.subject = match.name;
      newEntry.grade = match.grade;
    }

    return newEntry;
  });

// ---------------- Route Handlers ----------------

export const landing_page = async (req, res) => {
  try {
    const list = await db.displayAll();
    res.render("studentex", { entries: list });
  } catch (err) {
    console.error("promise rejected", err);
    res.status(500).send("Internal Server Error");
  }
};

export const web_development = async (req, res) => {
  const subject = "Web Development";
  try {
    const list = await db.displayWebDev();
    res.render("classList", { title: subject, entries: list });
  } catch (err) {
    console.error("promise rejected", err);
    res.status(500).send("Internal Server Error");
  }
};

export const low_performance = async (req, res) => {
  try {
    const list = await db.displayLowPerformance();
    res.render("performance", {
      title: "Students with poor performance",
      entries: list,
    });
  } catch (err) {
    console.error("promise rejected", err);
    res.status(500).send("Internal Server Error");
  }
};

// ---------------- Helper for pass/fail views ----------------

const renderSubjectStatus = async (req, res, subject, status) => {
  try {
    const list =
      status === "pass"
        ? await db.displayPass(subject)
        : await db.displayFail(subject);

    const subjectList = restructureData(subject, list);

    res.render("subjectPerformance", {
      title: subject,
      entries: subjectList,
      status,
    });
  } catch (err) {
    console.error("promise rejected", err);
    res.status(500).send("Internal Server Error");
  }
};

// ---------------- Fail Routes ----------------

export const fail_programming = (req, res) =>
  renderSubjectStatus(req, res, "Programming", "fail");

export const fail_se = (req, res) =>
  renderSubjectStatus(req, res, "Software Engineering", "fail");

export const fail_webdev = (req, res) =>
  renderSubjectStatus(req, res, "Web Development", "fail");

export const fail_aadp = (req, res) =>
  renderSubjectStatus(req, res, "Application Architectures", "fail");

// ---------------- Pass Routes ----------------

export const pass_programming = (req, res) =>
  renderSubjectStatus(req, res, "Programming", "pass");

export const pass_se = (req, res) =>
  renderSubjectStatus(req, res, "Software Engineering", "pass");

export const pass_webdev = (req, res) =>
  renderSubjectStatus(req, res, "Web Development", "pass");

export const pass_aadp = (req, res) =>
  renderSubjectStatus(req, res, "Application Architectures", "pass");

// ---------------- Class List Page ----------------

export const application_arch = async (req, res) => {
  const subject = "Application Architectures";
  try {
    const list = await db.displayAppArch();
    res.render("classList", { title: subject, entries: list });
  } catch (err) {
    console.error("promise rejected", err);
    res.status(500).send("Internal Server Error");
  }
};

export const soft_engineering = async (req, res) => {
  const subject = "Software Engineering";
  try {
    const list = await db.displaySoftEng();
    res.render("classList", { title: subject, entries: list });
  } catch (err) {
    console.error("promise rejected", err);
    res.status(500).send("Internal Server Error");
  }
};

export const prog = async (req, res) => {
  const subject = "Programming";
  try {
    const list = await db.displayProg();
    res.render("classList", { title: subject, entries: list });
  } catch (err) {
    console.error("promise rejected", err);
    res.status(500).send("Internal Server Error");
  }
};
// ---------------- JSON Endpoint ----------------

export const serveJson = async (req, res) => {
  try {
    const list = await db.displayAll();
    res.json(list);
  } catch (err) {
    console.error("promise rejected", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ---------------- Default Aggregate Export ----------------

export default {
  landing_page,
  web_development,
  low_performance,
  fail_programming,
  fail_se,
  fail_webdev,
  fail_aadp,
  pass_programming,
  pass_se,
  pass_webdev,
  pass_aadp,
  application_arch,
  soft_engineering,
  prog,
  serveJson,
};

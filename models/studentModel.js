// models/studentModel.js (ES Modules, nedb-promises without cursor API)

import Datastore from "nedb-promises";

export default class StudentDatabase {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = Datastore.create({ filename: dbFilePath, autoload: true });
      console.log("DB connected to " + dbFilePath);
    } else {
      this.db = Datastore.create({ inMemoryOnly: true });
      console.log("DB running in memory");
    }
  }

  /**
   * Seed the database if it's empty. Safe to call multiple times.
   */
  async init() {
    const count = await this.db.count({});
    if (count > 0) {
      console.log(`DB already seeded (${count} docs). Skipping init.`);
      return;
    }

    const seedDocs = [
      {
        student: "Ross",
        age: 20,
        programme: "Software Development",
        modules: [
          { name: "Programming", grade: 62 },
          { name: "Web Development", grade: 57 },
          { name: "Software Engineering", grade: 73 },
        ],
      },
      {
        student: "Ed",
        age: 20,
        programme: "Software Development",
        modules: [
          { name: "Programming", grade: 40 },
          { name: "Web Development", grade: 54 },
          { name: "Software Engineering", grade: 63 },
        ],
      },
      {
        student: "Ann",
        age: 20,
        programme: "Computing",
        modules: [
          { name: "Programming", grade: 57 },
          { name: "Web Development", grade: 70 },
          { name: "Software Engineering", grade: 59 },
        ],
      },
      {
        student: "Ali",
        age: 23,
        programme: "Software Development",
        modules: [
          { name: "Programming", grade: 36 },
          { name: "Application Architectures", grade: 36 },
          { name: "Software Engineering", grade: 66 },
        ],
      },
      {
        student: "Fred",
        age: 20,
        programme: "Software Development",
        modules: [
          { name: "Programming", grade: 78 },
          { name: "Application Architectures", grade: 67 },
          { name: "Software Engineering", grade: 69 },
        ],
      },
      {
        student: "Colin",
        age: 20,
        programme: "Software Development",
        modules: [
          { name: "Programming", grade: 61 },
          { name: "Application Architectures", grade: 42 },
          { name: "Software Engineering", grade: 70 },
        ],
      },
    ];

    await this.db.insert(seedDocs);
    console.log("Database seeded.");
  }

  // Utility to sort by student name safely
  sortByStudent(entries) {
    return entries.sort((a, b) =>
      String(a.student || "").localeCompare(String(b.student || ""), "en", {
        sensitivity: "base",
      })
    );
  }

  // -------------------- Queries using async/await --------------------

  async displayAll() {
    const entries = await this.db.find({});
    const sorted = this.sortByStudent(entries);
    console.log("displayAll returns:", sorted);
    return sorted;
  }

  async displayWebDev() {
    const entries = await this.db.find({ "modules.name": "Web Development" });
    const sorted = this.sortByStudent(entries);
    console.log("displayWebDev returns:", sorted);
    return sorted;
  }

  async displayAppArch() {
    const entries = await this.db.find({
      "modules.name": "Application Architectures",
    });
    const sorted = this.sortByStudent(entries);
    console.log("displayAppArch returns:", sorted);
    return sorted;
  }
  async displaySoftEng() {
    const entries = await this.db.find({
      "modules.name": "Software Engineering",
    });
    const sorted = this.sortByStudent(entries);
    console.log("displaySoftEng returns:", sorted);
    return sorted;
  }
  async displayProg() {
    const entries = await this.db.find({ "modules.name": "Programming" });
    const sorted = this.sortByStudent(entries);
    console.log("displayProg returns:", sorted);
    return sorted;
  }

  async displayLowPerformance() {
    const entries = await this.db.find({ "modules.grade": { $lt: 50 } });
    const sorted = this.sortByStudent(entries);
    console.log("displayLowPerformance returns:", sorted);
    return sorted;
  }

  async displayFail(subject) {
    const entries = await this.db.find({
      modules: { $elemMatch: { name: subject, grade: { $lt: 40 } } },
    });
    const sorted = this.sortByStudent(entries);
    console.log("displayFail returns:", sorted);
    return sorted;
  }

  async displayPass(subject) {
    const entries = await this.db.find({
      modules: { $elemMatch: { name: subject, grade: { $gte: 40 } } },
    });
    const sorted = this.sortByStudent(entries);
    console.log("displayPass returns:", sorted);
    return sorted;
  }

  // -------------------- Examples: update / push / remove --------------------
  // await this.db.update({ student: 'Ross' }, { $set: { age: 24 } }, { multi: false });
  // await this.db.update(
  //   { student: 'Fred' },
  //   { $push: { modules: { name: 'Web Development', grade: 67 } } },
  //   { multi: false }
  // );
  // await this.db.remove({ student: 'Ed' }, { multi: false });
}

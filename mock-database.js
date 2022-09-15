module.exports = class DB {
  constructor() {
    this.records = [];
  }

  addRecord = async (data) =>
    new Promise((resolve) => {
      this.records.push(data);
      resolve();
    });

  getRecordByUserId = async (id) =>
    new Promise((resolve) => {
      resolve(this.records.filter((item) => item.userId === id));
    });
};

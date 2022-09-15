module.exports = class DB {
  constructor() {
    this.records = [
      {
        userId: "1",
        name: "Alok",
      },
      {
        userId: "2",
        name: "Sasmit",
      },
    ];
  }

  addRecord = async (data) =>
    new Promise((r) => {
      this.records.push(data);
      r();
    });

  getRecordByUserId = async (id) => {
    return new Promise((resolve, reject) => {
      const data = this.records.filter((item) => item.userId === id);
      if (data?.length) {
        resolve(data);
      } else {
        reject([]);
      }
    });
  };
};

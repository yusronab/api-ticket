'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tickets', [
      {
        code: "TI000T03A03",
        departure: "Bandar Udara Internasional Sultan Iskandar Muda, Banda Aceh",
        departureCode: "BTJ",
        destination: "Bandar Udara Sultan Aji Muhammad Sulaiman, Balikpapan",
        destinationCode: "BPN",
        type: "Adult",
        class: "Business",
        takeOff: new Date(),
        arrive: new Date(),
        price: 1500000,
        totalChair: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: "TI001T03A03",
        departure: "Bandar Udara Pattimura, Ambon",
        departureCode: "AMQ",
        destination: "Bandar Udara Abdul Rachman Saleh, Malang",
        destinationCode: "MLG",
        type: "Adult",
        class: "Business",
        takeOff: new Date("01/11/2023 09:00:00"),
        arrive: new Date("01/11/2023 20:00:00"),
        price: 1250000,
        totalChair: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: "TI002T03A03",
        departure: "Bandar Udara Internasional Adisumarmo, Solo",
        departureCode: "SOC",
        destination: "Bandar Udara Internasional Sentani, Jayapura",
        destinationCode: "DJJ",
        type: "Adult",
        class: "Economy",
        takeOff: new Date("01/13/2022 18:00:00"),
        arrive: new Date("01/14/2022 00:48:00"),
        price: 2150000,
        totalChair: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: "TI003T03A03",
        departure: "Bandar Udara Internasional Minangkabau, Padang",
        departureCode: "PDG",
        destination: "Bandar Udara internasional Syamsudin Noor, Banjarmasin",
        destinationCode: "BDj",
        type: "Adult",
        class: "Economy",
        takeOff: new Date("01/13/2022 09:22:00"),
        arrive: new Date("01/13/2022 12:00:00"),
        price: 1000000,
        totalChair: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: "TI004T03A03",
        departure: "Bandar Udara Internasional Jenderal Ahmad Yani, Semarang",
        departureCode: "SRG",
        destination: "Bandar Udara Internasional Sultan Mahmud Badaruddin II, Palembang",
        destinationCode: "PLM",
        type: "Adult",
        class: "Business",
        takeOff: new Date("01/17/2022 12:05:00"),
        arrive: new Date("01/17/2022 16:10:00"),
        price: 1300000,
        totalChair: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: "TI005T03A03",
        departure: "Bandar Udara Internasional Juanda, Siduarjo",
        departureCode: "SUB",
        destination: "Bandar Udara Internasional Sultan Hasanuddin, Makassar",
        destinationCode: "UPG",
        type: "Adult",
        class: "Economy",
        takeOff: new Date("01/21/2022 18:30:00"),
        arrive: new Date("01/21/2022 20:05:00"),
        price: 1750000,
        totalChair: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: "TI006T03A03",
        departure: "Bandar Udara Internasional Soekarno-Hatta, Tanggerang",
        departureCode: "CGK",
        destination: "Bandar Udara Internasional Ngurah Rai, Denpasar",
        destinationCode: "DPS",
        type: "Adult",
        class: "Economy",
        takeOff: new Date("01/19/2022 13:05:00"),
        arrive: new Date("01/19/2022 15:05:00"),
        price: 1950000,
        totalChair: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: "TI007T03A03",
        departure: "Bandar Udara Internasional Supadio, Pontianak",
        departureCode: "PNK",
        destination: "Bandar Udara Internasional Husein Sastranegara, Bandung",
        destinationCode: "BDO",
        type: "Adult",
        class: "Business",
        takeOff: new Date("01/15/2022 18:30:00"),
        arrive: new Date("01/15/2022 20:15:00"),
        price: 1550000,
        totalChair: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: "TI008T03A03",
        departure: "Bandar Udara Internasional Hang Nadim, Batam",
        departureCode: "BTH",
        destination: "Bandar Udara Internasional Jenderal Ahmad Yani, Semarang",
        destinationCode: "SRG",
        type: "Adult",
        class: "First Class",
        takeOff: new Date("01/14/2022 17:25:00"),
        arrive: new Date("01/14/2022 18:55:00"),
        price: 2650000,
        totalChair: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: "TI009T03A03",
        departure: "Bandar Udara Internasional Adisutjipto, Daerah Istimewa Yogyakarta",
        departureCode: "JOG",
        destination: "Bandar Udara Halim Perdanakusuma, DKI Jakarta",
        destinationCode: "HLP",
        type: "Child",
        class: "Business",
        takeOff: new Date("01/30/2022 12:00:00"),
        arrive: new Date("01/30/2022 13:15:00"),
        price: 1200000,
        totalChair: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('Users', [
      {
        name: "Lovelly Super Admin",
        email: "superadmin@gmail.com",
        password: bcrypt.hashSync("superadmin", 10),
        image: "https://res.cloudinary.com/dptgh7efj/image/upload/v1668438995/user/k4qprdipa96sl2c3ugd0.jpg",
        phone: "+62 898 1234 4321",
        birth: new Date("02/02/2022"),
        role: "superadmin",
        isExist: true,
        isVerify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sir Admin The Great",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("admin", 10),
        image: "https://res.cloudinary.com/dptgh7efj/image/upload/v1668438995/user/k4qprdipa96sl2c3ugd0.jpg",
        phone: "+62 898 1234 4321",
        birth: new Date("02/02/2022"),
        role: "admin",
        isExist: true,
        isVerify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cristiano Faishalo",
        email: "faishal@gmail.com",
        password: bcrypt.hashSync("faishal", 10),
        image: "https://res.cloudinary.com/dptgh7efj/image/upload/v1668438995/user/k4qprdipa96sl2c3ugd0.jpg",
        phone: "+62 898 1234 4321",
        birth: new Date("02/02/2022"),
        role: "member",
        isExist: true,
        isVerify: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tickets', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};

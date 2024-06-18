const users = [
    {
      id:1,
      // profilePhoto: 'https://imgs.search.brave.com/jT7IUn2ncPcSP3ti97qt6nxlDHvMYHv9IuTNUnN_iyY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/bG9zZS11cC1wb3J0/cmFpdC1hdHRyYWN0/aXZlLW1hbGUtbW9k/ZWwteW91bmctaGFu/ZHNvbWUtbWFuLWJh/cl8xNTg1OTUtNTEz/NC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
      fullName: 'John Doe',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'johndoe123',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      dob: '1990-01-01',
      gender: 'Male',
      membershipType: 'Premium Membership',
      membershipStartDate: '2023-01-01',
      membershipExpiryDate: '2024-12-31',
      membershipStatus: 'Active',
      subscriptions: [
        { id: 'sub1', plan: 'Personal Training', expiryDate: '2023-08-15' },
        { id: 'sub2', plan: 'Yoga Classes', expiryDate: '2023-09-30' },
      ],
      attendance: [],
      weight: 75, // in kg
      bodyMeasurements: 'Waist: 32", Hips: 38", Chest: 40"',
      bodyFatPercentage: 20,
      bmi: 24.5,
      fitnessLevel: 'Intermediate',
      exerciseFrequency: 4, // times per week
      caloriesBurned: 2000, // kcal
      diet: 'High protein, low carb',
      sleepPatterns: '7-8 hours/night',
      hydration: 2.5, // liters per day
      steps: 10000, // steps per day
      heartRate: 70, // bpm
      bloodPressure: '120/80 mmHg',
      goals: 'Lose 5 kg, Run a marathon',
      contactMethod: 'Email',
      marketingPreferences: 'Opted-in',
      notifications: 'Enabled',
    },
    {
      id:2,
      // profilePhoto: 'https://imgs.search.brave.com/Hv5Z7zQWfTTqpwY_AQ5XBDcyQMr14UwMAB09ZkBrLrI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTQ3OTAxMDgzNzct/YmU5YzI5YjI5MzMw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRGOGZH/aGhjSEI1SlRJd1oy/bHliSHhsYm53d2ZI/d3dmSHg4TUE9PQ',
      fullName: 'Jane Smith',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'janesmith456',
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      dob: '1985-05-15',
      gender: 'Female',
      membershipType: 'Basic Membership',
      membershipStartDate: '2023-01-01',
      membershipExpiryDate: '2024-06-30',
      membershipStatus: 'Active',
      subscriptions: [
        { id: 'sub3', plan: 'Pilates Classes', expiryDate: '2023-07-15' },
        { id: 'sub4', plan: 'Nutrition Coaching', expiryDate: '2023-12-01' },
      ],
      attendance: [],
      weight: 65, // in kg
      bodyMeasurements: 'Waist: 28", Hips: 36", Chest: 34"',
      bodyFatPercentage: 22,
      bmi: 23.8,
      fitnessLevel: 'Intermediate',
      exerciseFrequency: 3, // times per week
      caloriesBurned: 1800, // kcal
      diet: 'Balanced diet',
      sleepPatterns: '7 hours/night',
      hydration: 2, // liters per day
      steps: 8000, // steps per day
      heartRate: 72, // bpm
      bloodPressure: '118/78 mmHg',
      goals: 'Improve flexibility, Run a 5k',
      contactMethod: 'Phone',
      marketingPreferences: 'Opted-out',
      notifications: 'Enabled',
    },
    {
      id:3,
      // profilePhoto: 'https://imgs.search.brave.com/fQBwT69WtgI4WG1WgU_LZZDt7So-3C_J3-_vETtT-Vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzI0L2Vj/L2M0LzI0ZWNjNDFk/YzE2YTlkOTliZjVk/ZGIxNTU3YTE1MjA0/LmpwZw',
      fullName: 'Alice Johnson',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'alicejohnson789',
      email: 'alice.johnson@example.com',
      phone: '+5555555555',
      dob: '1992-07-23',
      gender: 'Female',
      membershipType: 'Basic Membership',
      membershipStartDate: '2022-01-01',
      membershipExpiryDate: '2023-06-10',
      membershipStatus: 'Expired',
      subscriptions: [
        { id: 'sub5', plan: 'Zumba Classes', expiryDate: '2023-05-20' },
        { id: 'sub6', plan: 'Health Coaching', expiryDate: '2023-06-01' },
      ],
      attendance: [],
      weight: 70, // in kg
      bodyMeasurements: 'Waist: 30", Hips: 38", Chest: 36"',
      bodyFatPercentage: 25,
      bmi: 26.1,
      fitnessLevel: 'Beginner',
      exerciseFrequency: 2, // times per week
      caloriesBurned: 1500, // kcal
      diet: 'Vegetarian',
      sleepPatterns: '6 hours/night',
      hydration: 1.5, // liters per day
      steps: 6000, // steps per day
      heartRate: 75, // bpm
      bloodPressure: '125/85 mmHg',
      goals: 'Lose 10 kg, Improve stamina',
      contactMethod: 'Email',
      marketingPreferences: 'Opted-in',
      notifications: 'Disabled',
    },
    {      
      id:4,
      // profilePhoto: 'https://imgs.search.brave.com/eEVp_V-cmLi9LgqftEJwlzgp6zoUdZ-det8nnW0yADY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMC8w/My8yNi8wOS8wOC9n/aXJsLTQ5Njk2OTBf/NjQwLmpwZw',
      fullName: 'Bob Brown',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'bobbrown234',
      email: 'bob.brown@example.com',
      phone: '+2345678901',
      dob: '1980-03-10',
      gender: 'Male',
      membershipType: 'Standard Membership',
      membershipStartDate: '2022-01-01',
      membershipExpiryDate: '2023-11-01',
      membershipStatus: 'Expired',
      subscriptions: [
        { id: 'sub7', plan: 'CrossFit Classes', expiryDate: '2023-09-10' },
        { id: 'sub8', plan: 'Cardio Sessions', expiryDate: '2023-10-15' },
      ],
      attendance: [],
      weight: 85, // in kg
      bodyMeasurements: 'Waist: 36", Hips: 40", Chest: 44"',
      bodyFatPercentage: 28,
      bmi: 27.9,
      fitnessLevel: 'Intermediate',
      exerciseFrequency: 3, // times per week
      caloriesBurned: 2200, // kcal
      diet: 'Balanced diet',
      sleepPatterns: '6-7 hours/night',
      hydration: 2.5, // liters per day
      steps: 9000, // steps per day
      heartRate: 68, // bpm
      bloodPressure: '130/85 mmHg',
      goals: 'Build muscle, Improve endurance',
      contactMethod: 'Phone',
      marketingPreferences: 'Opted-out',
      notifications: 'Enabled',
    },
    {
      id:5,
      // profilePhoto: 'https://imgs.search.brave.com/gb6CllNKgkpTsD3gfiw7l9f1MBoCNM2RoQZK6KgZCew/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbW1l/cnNpdmVwb3JuLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wNi9Qb3JuQUkt/MjAtc2Vjb25kcy0x/MC1wZXJjZW50LWVy/cm9yLXJhdGUtNjQw/eDQ4MC5qcGc',
      fullName: 'Charlie Davis',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'charliedavis567',
      email: 'charlie.davis@example.com',
      phone: '+9876543210',
      dob: '1995-09-25',
      gender: 'Male',
      membershipType: 'Premium Membership',
      membershipStartDate: '2023-01-01',
      membershipExpiryDate: '2024-08-15',
      membershipStatus: 'Active',
      subscriptions: [
        { id: 'sub9', plan: 'Strength Training', expiryDate: '2023-08-01' },
        { id: 'sub10', plan: 'Wellness Coaching', expiryDate: '2023-11-20' },
      ],
      attendance: [],
      weight: 78, // in kg
      bodyMeasurements: 'Waist: 34", Hips: 36", Chest: 42"',
      bodyFatPercentage: 18,
      bmi: 23.7,
      fitnessLevel: 'Advanced',
      exerciseFrequency: 5, // times per week
      caloriesBurned: 2500, // kcal
      diet: 'High protein, moderate carbs',
      sleepPatterns: '8 hours/night',
      hydration: 3, // liters per day
      steps: 12000, // steps per day
      heartRate: 65, // bpm
      bloodPressure: '118/76 mmHg',
      goals: 'Gain muscle, Reduce body fat',
      contactMethod: 'Email',
      marketingPreferences: 'Opted-in',
      notifications: 'Enabled',
    },
    {
      id:6,
      // profilePhoto: 'https://imgs.search.brave.com/-kGCdxocIvAvUFCSP7tvkaBWr8YzE6b4nuMt0rCB5uo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bXJwb3JuZ2Vlay5j/b20vd3AtY29udGVu/dC91cGxvYWRzL01J/TEYtVHViZS1TaXRl/cy5qcGc',
      fullName: 'Dana Evans',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'danaevans678',
      email: 'dana.evans@example.com',
      phone: '+3456789012',
      dob: '1988-11-11',
      gender: 'Female',
      membershipType: 'Standard Membership',
      membershipStartDate: '2022-01-01',
      membershipExpiryDate: '2023-07-20',
      membershipStatus: 'Expired',
      subscriptions: [
        { id: 'sub11', plan: 'Aerobics Classes', expiryDate: '2023-06-30' },
        { id: 'sub12', plan: 'Meditation Sessions', expiryDate: '2023-07-10' },
      ],
      attendance: [],
      weight: 68, // in kg
      bodyMeasurements: 'Waist: 29", Hips: 37", Chest: 35"',
      bodyFatPercentage: 23,
      bmi: 23.9,
      fitnessLevel: 'Intermediate',
      exerciseFrequency: 3, // times per week
      caloriesBurned: 1700, // kcal
      diet: 'Balanced diet',
      sleepPatterns: '7-8 hours/night',
      hydration: 2, // liters per day
      steps: 8500, // steps per day
      heartRate: 74, // bpm
      bloodPressure: '122/80 mmHg',
      goals: 'Maintain weight, Improve flexibility',
      contactMethod: 'Phone',
      marketingPreferences: 'Opted-out',
      notifications: 'Enabled',
    },
    {
      id:7,
      // profilePhoto: 'https://imgs.search.brave.com/-kGCdxocIvAvUFCSP7tvkaBWr8YzE6b4nuMt0rCB5uo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bXJwb3JuZ2Vlay5j/b20vd3AtY29udGVu/dC91cGxvYWRzL01J/TEYtVHViZS1TaXRl/cy5qcGc',
      fullName: 'Ella Green',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'ellagreen789',
      email: 'ella.green@example.com',
      phone: '+4567890123',
      dob: '1991-04-18',
      gender: 'Female',
      membershipType: 'Basic Membership',
      membershipStartDate: '2023-01-01',
      membershipExpiryDate: '2024-03-25',
      membershipStatus: 'Active',
      subscriptions: [
        { id: 'sub13', plan: 'Dance Classes', expiryDate: '2023-11-05' },
        { id: 'sub14', plan: 'Nutritional Guidance', expiryDate: '2023-12-15' },
      ],
      attendance: [],
      weight: 64, // in kg
      bodyMeasurements: 'Waist: 27", Hips: 35", Chest: 33"',
      bodyFatPercentage: 21,
      bmi: 22.5,
      fitnessLevel: 'Intermediate',
      exerciseFrequency: 4, // times per week
      caloriesBurned: 1900, // kcal
      diet: 'Low carb, high protein',
      sleepPatterns: '7 hours/night',
      hydration: 2.2, // liters per day
      steps: 9500, // steps per day
      heartRate: 70, // bpm
      bloodPressure: '120/78 mmHg',
      goals: 'Tone muscles, Increase stamina',
      contactMethod: 'Email',
      marketingPreferences: 'Opted-in',
      notifications: 'Enabled',
    },
    {
      id:8,
      // profilePhoto: 'https://imgs.search.brave.com/-kGCdxocIvAvUFCSP7tvkaBWr8YzE6b4nuMt0rCB5uo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/bXJwb3JuZ2Vlay5j/b20vd3AtY29udGVu/dC91cGxvYWRzL01J/TEYtVHViZS1TaXRl/cy5qcGc',
      fullName: 'Frank Harris',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'frankharris890',
      email: 'frank.harris@example.com',
      phone: '+5678901234',
      dob: '1987-08-05',
      gender: 'Male',
      membershipType: 'Premium Membership',
      membershipStartDate: '2023-01-01',
      membershipExpiryDate: '2023-12-10',
      membershipStatus: 'Expired',
      subscriptions: [
        { id: 'sub15', plan: 'HIIT Classes', expiryDate: '2023-09-25' },
        { id: 'sub16', plan: 'Weight Loss Coaching', expiryDate: '2023-11-30' },
      ],
      attendance: [],
      weight: 90, // in kg
      bodyMeasurements: 'Waist: 38", Hips: 42", Chest: 46"',
      bodyFatPercentage: 26,
      bmi: 28.3,
      fitnessLevel: 'Intermediate',
      exerciseFrequency: 3, // times per week
      caloriesBurned: 2300, // kcal
      diet: 'Moderate carbs, high protein',
      sleepPatterns: '6-7 hours/night',
      hydration: 2.5, // liters per day
      steps: 10000, // steps per day
      heartRate: 72, // bpm
      bloodPressure: '125/82 mmHg',
      goals: 'Lose 5 kg, Build strength',
      contactMethod: 'Phone',
      marketingPreferences: 'Opted-out',
      notifications: 'Enabled',
    },
    {
      id:9,
      // profilePhoto: 'https://cdnxw17.youx.xxx/gthumb/3/496/3496105_050c25a_320x_.jpg',
      fullName: 'Grace Ivers',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'graceivers123',
      email: 'grace.ivers@example.com',
      phone: '+6789012345',
      dob: '1993-02-10',
      gender: 'Female',
      membershipType: 'Standard Membership',
      membershipStartDate: '2023-01-01',
      membershipExpiryDate: '2024-01-05',
      membershipStatus: 'Active',
      subscriptions: [
        { id: 'sub17', plan: 'Spinning Classes', expiryDate: '2023-10-10' },
        { id: 'sub18', plan: 'Health Coaching', expiryDate: '2023-12-01' },
      ],
      attendance: [],
      weight: 72, // in kg
      bodyMeasurements: 'Waist: 31", Hips: 39", Chest: 37"',
      bodyFatPercentage: 24,
      bmi: 24.2,
      fitnessLevel: 'Intermediate',
      exerciseFrequency: 4, // times per week
      caloriesBurned: 2000, // kcal
      diet: 'Balanced diet',
      sleepPatterns: '8 hours/night',
      hydration: 2.8, // liters per day
      steps: 11000, // steps per day
      heartRate: 68, // bpm
      bloodPressure: '119/78 mmHg',
      goals: 'Improve cardiovascular health, Increase flexibility',
      contactMethod: 'Email',
      marketingPreferences: 'Opted-in',
      notifications: 'Enabled',
    },
    {
      id:10,
      // profilePhoto: "https://i.pinimg.com/736x/8a/c3/01/8ac301d8f4e08394d5ec4668adb8f463.jpg",
      fullName: 'Henry King',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'henryking234',
      email: 'henry.king@example.com',
      phone: '+7890123456',
      dob: '1990-12-20',
      gender: 'Male',
      membershipType: 'Basic Membership',
      membershipStartDate: '2023-01-01',
      membershipExpiryDate: '2024-02-20',
      membershipStatus: 'Active',
      subscriptions: [
        { id: 'sub19', plan: 'Bodybuilding Classes', expiryDate: '2023-11-01' },
        { id: 'sub20', plan: 'Dietary Consultation', expiryDate: '2023-12-20' },
      ],
      attendance: [],
      weight: 80, // in kg
      bodyMeasurements: 'Waist: 35", Hips: 37", Chest: 43"',
      bodyFatPercentage: 20,
      bmi: 24.7,
      fitnessLevel: 'Intermediate',
      exerciseFrequency: 3, // times per week
      caloriesBurned: 2100, // kcal
      diet: 'High protein, moderate carbs',
      sleepPatterns: '7-8 hours/night',
      hydration: 2.5, // liters per day
      steps: 9500, // steps per day
      heartRate: 70, // bpm
      bloodPressure: '120/80 mmHg',
      goals: 'Build muscle, Reduce body fat',
      contactMethod: 'Email',
      marketingPreferences: 'Opted-in',
      notifications: 'Enabled',
    },
    {
      id:11,
      // profilePhoto:"https://goodsexporn.org/media/galleries/53e92a697dcc2/10.jpg",
      fullName: 'Isabella Lee',
      profilePhoto:"https://thispersondoesnotexist.com/",
      username: 'isabellalee345',
      email: 'isabella.lee@example.com',
      phone: '+8901234567',
      dob: '1996-06-30',
      gender: 'Female',
      membershipType: 'Premium Membership',
      membershipStartDate: '2023-01-01',
      membershipExpiryDate: '2024-09-10',
      membershipStatus: 'Active',
      subscriptions: [
        { id: 'sub21', plan: 'Yoga Classes', expiryDate: '2023-12-05' },
        { id: 'sub22', plan: 'Personal Training', expiryDate: '2024-01-15' },
      ],
      attendance: [],
      weight: 62, // in kg
      bodyMeasurements: 'Waist: 26", Hips: 34", Chest: 32"',
      bodyFatPercentage: 19,
      bmi: 22.1,
      fitnessLevel: 'Advanced',
      exerciseFrequency: 5, // times per week
      caloriesBurned: 2400, // kcal
      diet: 'High protein, low carb',
      sleepPatterns: '7 hours/night',
      hydration: 3, // liters per day
      steps: 12500, // steps per day
      heartRate: 65, // bpm
      bloodPressure: '115/75 mmHg',
      goals: 'Maintain fitness level, Increase flexibility',
      contactMethod: 'Email',
      marketingPreferences: 'Opted-in',
      notifications: 'Enabled',
    },
  ];

  export default users;

import { Transaction, TransactionType } from '../types/Transaction';

const transactionTypes: TransactionType[] = [
  'Incoming Money',
  'Bank Deposits',
  'Mobile Money Payment',
  'Airtime Purchase',
  'Data Bundle Purchase',
  'Utility Bill Payment',
  'Merchant Payment',
  'Cash Out',
  'Transfer to Bank',
  'Service Payment'
];

// Real names and patterns from the SMS data
const realNames = [
  'Jane Smith', 'Samuel Carter', 'Alex Doe', 'Robert Brown', 'Linda Green',
  'Michael Johnson', 'Sarah Wilson', 'David Davis', 'Emma Taylor', 'James Miller',
  'Olivia Anderson', 'William Garcia', 'Sophia Martinez', 'Benjamin Rodriguez',
  'Isabella Lewis', 'Lucas Walker', 'Mia Hall', 'Henry Allen', 'Charlotte Young'
];

const sampleMessages: Record<TransactionType, string[]> = {
  'Incoming Money': [
    'You have received {amount} RWF from {name} (*********{phone_end}) on your mobile money account at {datetime}. Message from sender: . Your new balance:{balance} RWF. Financial Transaction Id: {ref}.',
    'You have received {amount} RWF from {name} ({phone}) on your mobile money account at {datetime}. Your new balance: {balance} RWF. Transaction ID: {ref}',
    'Money received: {amount} RWF from {name} (*********{phone_end}). New balance: {balance} RWF. Ref: {ref}'
  ],
  'Bank Deposits': [
    '*113*R*A bank deposit of {amount} RWF has been added to your mobile money account at {datetime}. Your NEW BALANCE :{balance} RWF. Cash Deposit::CASH::::0::{agent_number}.Thank you for using MTN MobileMoney.*EN#',
    'Bank deposit successful. {amount} RWF added to your account at {datetime}. New balance: {balance} RWF. Agent: {agent_number}'
  ],
  'Mobile Money Payment': [
    'TxId: {ref}. Your payment of {amount} RWF to {name} {code} has been completed at {datetime}. Your new balance: {balance} RWF. Fee was {fee} RWF.Kanda*182*16# wiyandikishe muri poromosiyo ya BivaMoMotima, ugire amahirwe yo gutsindira ibihembo bishimishije.',
    '*165*S*{amount} RWF transferred to {name} ({phone}) from {sender_code} at {datetime} . Fee was: {fee} RWF. New balance: {balance} RWF. Kugura ama inite cg interineti kuri MoMo, Kanda *182*2*1# .*EN#'
  ],
  'Airtime Purchase': [
    '*162*TxId:{ref}*S*Your payment of {amount} RWF to Airtime with token has been completed at {datetime}. Fee was {fee} RWF. Your new balance: {balance} RWF . Message: - -. *EN#',
    'Airtime purchase successful. {amount} RWF airtime loaded at {datetime}. New balance: {balance} RWF. Ref: {ref}'
  ],
  'Data Bundle Purchase': [
    'Data bundle purchase: {amount} RWF at {datetime}. New balance: {balance} RWF. Ref: {ref}',
    'Internet bundle of {amount} RWF purchased successfully. Balance: {balance} RWF. Transaction: {ref}'
  ],
  'Utility Bill Payment': [
    'Utility payment of {amount} RWF completed at {datetime}. Account: {account}. New balance: {balance} RWF. Ref: {ref}',
    'EUCL bill payment: {amount} RWF. Meter: {meter}. Balance: {balance} RWF. TxId: {ref}'
  ],
  'Merchant Payment': [
    'Payment to {merchant} of {amount} RWF completed at {datetime}. Balance: {balance} RWF. Ref: {ref}',
    'Merchant payment successful. {amount} RWF to {merchant}. New balance: {balance} RWF'
  ],
  'Cash Out': [
    'Cash withdrawal of {amount} RWF at agent {agent} completed at {datetime}. Fee: {fee} RWF. Balance: {balance} RWF. Ref: {ref}',
    'You have withdrawn {amount} RWF. Agent: {agent}. Fee: {fee} RWF. Balance: {balance} RWF'
  ],
  'Transfer to Bank': [
    'Bank transfer of {amount} RWF to {bank} completed at {datetime}. Fee: {fee} RWF. Balance: {balance} RWF. Ref: {ref}',
    'Transfer to {bank}: {amount} RWF. Fee: {fee} RWF. New balance: {balance} RWF'
  ],
  'Service Payment': [
    'Service payment of {amount} RWF to {service} completed at {datetime}. Balance: {balance} RWF. Ref: {ref}',
    'Payment to {service}: {amount} RWF. New balance: {balance} RWF. Transaction: {ref}'
  ]
};

const generateRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const generateRandomPhone = (): string => {
  const prefixes = ['250788', '250791', '250790', '250795'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return prefix + suffix;
};

const generateRandomReference = (): string => {
  return Math.floor(Math.random() * 100000000000).toString();
};

const formatDateTime = (date: string): string => {
  const d = new Date(date);
  return d.toISOString().slice(0, 19).replace('T', ' ');
};

const getRandomName = (): string => {
  return realNames[Math.floor(Math.random() * realNames.length)];
};

const getRandomAmount = (type: TransactionType): number => {
  // Based on actual SMS data patterns
  switch (type) {
    case 'Incoming Money':
      return Math.floor(Math.random() * 50000) + 1000; // 1k - 50k
    case 'Bank Deposits':
      return Math.floor(Math.random() * 100000) + 5000; // 5k - 100k
    case 'Mobile Money Payment':
      return Math.floor(Math.random() * 20000) + 500; // 500 - 20k
    case 'Airtime Purchase':
      return Math.floor(Math.random() * 5000) + 500; // 500 - 5k
    case 'Data Bundle Purchase':
      return Math.floor(Math.random() * 3000) + 500; // 500 - 3k
    case 'Utility Bill Payment':
      return Math.floor(Math.random() * 15000) + 2000; // 2k - 15k
    case 'Merchant Payment':
      return Math.floor(Math.random() * 25000) + 1000; // 1k - 25k
    case 'Cash Out':
      return Math.floor(Math.random() * 50000) + 5000; // 5k - 50k
    case 'Transfer to Bank':
      return Math.floor(Math.random() * 100000) + 10000; // 10k - 100k
    case 'Service Payment':
      return Math.floor(Math.random() * 10000) + 1000; // 1k - 10k
    default:
      return Math.floor(Math.random() * 10000) + 1000;
  }
};

const getFee = (amount: number, type: TransactionType): number => {
  // Realistic fee structure based on SMS data
  switch (type) {
    case 'Mobile Money Payment':
      if (amount <= 1000) return 20;
      if (amount <= 5000) return 50;
      if (amount <= 10000) return 100;
      return 150;
    case 'Cash Out':
      if (amount <= 5000) return 100;
      if (amount <= 20000) return 200;
      return 300;
    case 'Transfer to Bank':
      return Math.floor(amount * 0.005); // 0.5% fee
    case 'Airtime Purchase':
    case 'Data Bundle Purchase':
    case 'Incoming Money':
    case 'Bank Deposits':
      return 0;
    default:
      return Math.floor(Math.random() * 100);
  }
};

export const generateMockData = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  let runningBalance = 50000; // Starting balance

  for (let i = 1; i <= count; i++) {
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const amount = getRandomAmount(type);
    const fee = getFee(amount, type);
    const name = getRandomName();
    const phone = generateRandomPhone();
    const ref = generateRandomReference();
    const date = generateRandomDate(startDate, endDate);
    const datetime = formatDateTime(date + 'T' + Math.floor(Math.random() * 24).toString().padStart(2, '0') + ':' + Math.floor(Math.random() * 60).toString().padStart(2, '0') + ':' + Math.floor(Math.random() * 60).toString().padStart(2, '0'));

    // Update running balance based on transaction type
    if (type === 'Incoming Money' || type === 'Bank Deposits') {
      runningBalance += amount;
    } else {
      runningBalance -= (amount + fee);
      if (runningBalance < 0) runningBalance = Math.floor(Math.random() * 100000) + 10000; // Reset if negative
    }

    const messageTemplates = sampleMessages[type];
    const template = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
    
    const body = template
      .replace('{amount}', amount.toLocaleString())
      .replace('{name}', name)
      .replace('{phone}', phone)
      .replace('{phone_end}', phone.slice(-3))
      .replace('{balance}', runningBalance.toLocaleString())
      .replace('{ref}', ref)
      .replace('{datetime}', datetime)
      .replace('{fee}', fee.toString())
      .replace('{code}', Math.floor(Math.random() * 99999).toString())
      .replace('{sender_code}', Math.floor(Math.random() * 99999999).toString())
      .replace('{agent_number}', '250795963036')
      .replace('{agent}', Math.floor(Math.random() * 99999).toString())
      .replace('{bank}', 'BK Bank')
      .replace('{merchant}', 'Shop ' + Math.floor(Math.random() * 999))
      .replace('{service}', 'Service ' + Math.floor(Math.random() * 999))
      .replace('{account}', Math.floor(Math.random() * 999999999).toString())
      .replace('{meter}', Math.floor(Math.random() * 999999).toString());

    transactions.push({
      id: i,
      body,
      type,
      amount,
      date,
      phoneNumber: phone,
      reference: ref
    });
  }

  // Sort by date (newest first)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

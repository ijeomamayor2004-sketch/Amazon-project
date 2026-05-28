import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
  // Parameter passed should be a variable containing atleast dayjs() function

  const dayOfWeek = date.format('dddd');
  let dateCheck;
  if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
    dateCheck = true;
  } else {
    dateCheck = false
  }
  return dateCheck;
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs(); 
  // This contains a dayjs object with todays date

  while (remainingDays > 0) {
    // Assigning an dayjs object containing tommorrows date as the new deliveryDate value
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
      // This is a shortcut for:
      // remainingDays = remainingDays - 1;
    }
  }

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  return dateString;
}
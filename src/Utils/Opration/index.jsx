export const normalizeSizeColor = (Str)=>{
    const result = Str.split(",").reduce((acc, item) => {
        const [key, value] = item.split(":");
        acc[key.trim().toLowerCase()] = value.trim();
        return acc;
      }, {});

      // Access safely
    const color = result.color || "";
    const size = result.size || "";

    //console.log("Color:", color); // black
    //console.log("Size:", size);   // S

    return `Color : ${color},  Size : ${size}`
}


export const Calculating_Ratings = (reviews) => {
  const ratingCount = {
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  };

  const numberToKey = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
  };

  const data = reviews.map(review => Number(review.Rating));

  let total = 0;

  data.forEach(rating => {
    const key = numberToKey[rating];
    if (key) {
      ratingCount[key]++;
      total += rating;
    }
  });

  const average = data.length > 0 ? (total / data.length).toFixed(1) : 0;

  return {
    ratingCount,
    averageRating: Number(average),
  };
};

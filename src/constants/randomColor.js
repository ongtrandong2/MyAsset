// const randomColor = () => {
//     const generateRandomColor = Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, '0');
//     return `#${generateRandomColor}`;
// }

// export default randomColor;

const randomColor = () => {
   //let r = Math.floor(Math.random() *(255 - 100)) + 100;
   let r = Math.floor(Math.random() * 256) 
   let g = Math.floor(Math.random() * 256);
   let b = Math.floor(Math.random() * 256);
   return `rgb(${r},${g},${b})`;

}
 
export default randomColor;

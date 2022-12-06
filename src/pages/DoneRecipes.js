// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';

// export default function DoneRecipes() {
//   return (
//     <div>
//       <button
//         type="button"
//         data-testid="filter-by-all-btn"
//       >
//         All
//       </button>
//       <button
//         type="button"
//         data-testid="filter-by-meal-btn"
//       >
//         Meals
//       </button>
//       <button
//         type="button"
//         data-testid="filter-by-drink-btn"
//       >
//         Drinks
//       </button>
//       {
//         mock.map((item, index) => (
//           <div key={ index }>
//             <img src={ item.image } alt="" data-testid={ `${index}-horizontal-image` } />
//             <p data-testid={ `${index}-horizontal-top-text` }>{item.category}</p>
//             <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
//             <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
//             <button
//               type="button"
//               // onClick={ shareLink }
//               data-testid={ `${index}-horizontal-share-btn` }
//             >
//               <img
//                 src={ shareIcon }
//                 alt="share button"
//               />
//             </button>
//             <p data-testid={ `${index}-${item.tags}-horizontal-tag` }>{item.tags}</p>
//           </div>
//         ))
//       }
//     </div>
//   );
// }

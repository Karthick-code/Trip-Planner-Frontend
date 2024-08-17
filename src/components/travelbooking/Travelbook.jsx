import React from 'react';
import Travellayout from './Travellayout';
import AuthContext from "../../context/AuthContext";
import { Paper } from '@mui/material';

function Travelbook() {
  const { user } = React.useContext(AuthContext);

  return (
    <>
      {user ? (
        <Travellayout>
        </Travellayout>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          padding: '20px',
        }}>
          <h1>Please login to access this page</h1>
        </div>
      )}
    </>
  );
}

export default Travelbook;











// import React from 'react';
// import Travellayout from './Travellayout';
// import AuthContext  from "../../context/AuthContext";
// function Travelbook() {
//   const { user } = React.useContext(AuthContext);
//   return (
//     {user?
//       (<div>
//         <Travellayout>
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: '100vh',
//           backgroundColor: '#f5f5f5',
//           padding: '20px',
//         }}>
          
//         Welcome to travel booking page!
  
//         </div>
//       </Travellayout>
//         </div>):(
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: '100vh',
//           backgroundColor: '#f5f5f5',
//           padding: '20px',
//         }}>
//           <h1>Please login to access this page</h1>
//         </div>
//       )
//     }
    
//   );
// }
// export default Travelbook;
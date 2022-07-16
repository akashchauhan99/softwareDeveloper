// interface User {
//    _id: string;
//    name: string;
//    email: string;
//    password: string;
//    twoFactorAuthenticationCode: string;
//    isTwoFactorAuthenticationEnabled: boolean;
//    address?: {
//       street: string,
//       city: string,
//       country: string,
//    };
// }

// export default User;

interface User {
   _id: string;
   firstName: string;
   lastName: string;
   // fullName: string;
   email: string;
   password: string;
   address?: {
      street: string,
      city: string,
   };
}

export default User;
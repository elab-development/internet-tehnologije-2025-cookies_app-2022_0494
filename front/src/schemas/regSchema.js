import * as yup from "yup"

 const regSchema = yup.object({
    name: yup.string("Neispravan format").required("Ime je obavezno"),
    age: yup
    .number().required("Broj godina je obavezan").positive("Neispravan format").integer("Neispravan format").typeError("Neispravan format"),
    phone: yup.string("Neispravan format")
    .required('Broj telefona je obavezan')
    .matches(/\+(38)[0-9]{6,15}/, 'Mora biti u formatu +38*********'),
    email: yup.string("Neispravan format").email("Neispravan format emaila").required("Email je obavezan"),
    password: yup.string("Neispravan format").required("Lozinka je obavezna").min(7,'Lozinka mora imati najmanje 7 karaktera'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Lozinke moraju da se podudaraju')
        .required('Potvrda lozinke je obavezna'),
  });

  export default regSchema
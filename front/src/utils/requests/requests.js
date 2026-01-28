import apiURL from "../api/apiUrl";
import useAuthContext from "@/hooks/useAuthContext";



export const getCourse = async (id) => {
    try {
      const response = await fetch(`${apiURL}/api/courses/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(error)
    } 
  };

  export const getCourses = async (token) => {
    try {
      const response = await fetch(`${apiURL}/api/courses`, {
          headers: {
              'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
              // 'Content-Type': 'application/json', // Specify the content type of the 
              // "mode":"no-cors"
          }
      });
        if (!response.ok) {
            throw new Error("Failed to fetch courses");
        }
        const courses = await response.json();
        console.log(courses)
        return courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
        return []; 
    }
};


export const getMyCourses = async (token, id) => {
  try {
    console.log(id)
    const response = await fetch(`${apiURL}/api/courses/my-courses/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
            // 'Content-Type': 'application/json', // Specify the content type of the 
            // "mode":"no-cors"
        }
    });
      if (!response.ok) {
          throw new Error("Failed to fetch courses");
      }
      const courses = await response.json();
      console.log(courses)
      return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
      return []; 
  }
};

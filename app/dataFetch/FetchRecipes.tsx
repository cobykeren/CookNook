import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

interface Recipe {
  id: string;
  title: string;
  body: string;
  rating: number;
  dateCreated: Timestamp;
}

export const useFetchAllRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const recipesCollectionRef = collection(db, "users", user.uid, "recipes");
      const recipesQuery = query(
        recipesCollectionRef,
        orderBy("dateCreated", "desc")
      );

      // Set up the real-time listener
      const unsubscribe = onSnapshot(
        recipesQuery,
        (querySnapshot) => {
          const fetchedRecipes = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title,
              body: data.body,
              rating: data.rating,
              dateCreated: data.dateCreated,
            } as Recipe;
          });
          setRecipes(fetchedRecipes);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching recipes: ", error);
          setLoading(false);
        }
      );

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }
  }, []);

  return { recipes, loading };
};
// export const useFetchAllRecipes = () => {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         try {
//           const recipesCollectionRef = collection(
//             db,
//             "users",
//             user.uid,
//             "recipes"
//           );
//           const recipesQuery = query(
//             recipesCollectionRef,
//             orderBy("dateCreated", "desc")
//           );

//           const querySnapshot = await getDocs(recipesQuery);
//           const fetchedRecipes = querySnapshot.docs.map((doc) => {
//             const data = doc.data();
//             return {
//               id: doc.id,
//               title: data.title,
//               body: data.body,
//               rating: data.rating,
//               dateCreated: data.dateCreated,
//             } as Recipe;
//           });
//           setRecipes(fetchedRecipes);
//         } catch (error) {
//           console.error("Error fetching recipes: ", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchRecipes();
//   }, []);

//   return { recipes, loading };
// };

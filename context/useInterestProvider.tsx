import React, { 
    createContext, 
    useState, 
    useContext, 
    ReactNode, 
    useEffect 
  } from 'react';
  import auth from "@react-native-firebase/auth";
  import firestore from "@react-native-firebase/firestore";
  import { Alert } from 'react-native';
  
  // Define the shape of the context
  interface UserInterestsContextType {
    interests: string[];
    setInterests: (interests: string[]) => void;
    fetchUserInterests: () => Promise<void>;
    saveUserInterests: (newInterests: string[]) => Promise<boolean>;
  }
  
  // Create the context
  const UserInterestsContext = createContext<UserInterestsContextType>({
    interests: [],
    setInterests: () => {},
    fetchUserInterests: async () => {},
    saveUserInterests: async () => false
  });
  
  // Provider component
  export const UserInterestsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [interests, setInterests] = useState<string[]>([]);
  
    const fetchUserInterests = async () => {
      const user = auth().currentUser;
  
      if (user) {
        try {
          const userDoc = await firestore()
            .collection("users")
            .doc(user.uid)
            .get();
  
          if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData?.interests && Array.isArray(userData.interests)) {
              setInterests(userData.interests);
            }
          }
        } catch (error) {
          console.error("Error fetching user interests: ", error);
        }
      }
    };
  
    const saveUserInterests = async (newInterests: string[]) => {
      const user = auth().currentUser;
  
      if (!user) {
        Alert.alert("Error", "You must be signed in to save interests");
        return false;
      }
  
      try {
        await firestore().collection("users").doc(user.uid).update({
          interests: newInterests,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        setInterests(newInterests);
        return true;
      } catch (error) {
        console.error("Error saving interests: ", error);
        Alert.alert("Error", "Failed to save your interests");
        return false;
      }
    };
  
    return (
      <UserInterestsContext.Provider 
        value={{ 
          interests, 
          setInterests, 
          fetchUserInterests, 
          saveUserInterests 
        }}
      >
        {children}
      </UserInterestsContext.Provider>
    );
  };
  
  // Custom hook to use the UserInterests context
  export const useUserInterests = () => {
    const context = useContext(UserInterestsContext);
    
    if (!context) {
      throw new Error('useUserInterests must be used within a UserInterestsProvider');
    }
    
    return context;
  };
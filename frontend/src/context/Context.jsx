import { createContext, useState } from "react"


export const context = createContext(null)
export default function Context({ children }) {

  const [ans, setAns] = useState('notset')
  const [start, setStart] = useState(false);

  const [prevTs, setPrevTs] = useState(0)

  const [htmlContent, setHtmlContent] = useState(() => {
    const saveData = localStorage.getItem('resumeresult')
    return saveData ? JSON.parse(saveData) : '';

  });
  const [transcriptCleared, setTranscriptCleared] = useState(false);
  const [hrQuestion, setHrQuestion] = useState("");

  const [ts, setTs] = useState('')

  const [emotion, setEmotion] = useState('');
  
  // Auth state with role support
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || '';
  });
  
  // Role field: 'student' or 'hr'
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'student';
  });
  
  // Helper to persist auth state
  const login = (name, role) => {
    setIsLoggedIn(true);
    setUserName(name);
    setUserRole(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userRole', role);
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('student');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  };
  
  const values = { 
    htmlContent, setHtmlContent, 
    transcriptCleared, setTranscriptCleared, 
    hrQuestion, setHrQuestion, 
    ts, setTs, 
    emotion, setEmotion, 
    prevTs, setPrevTs, 
    ans, setAns,
    start, setStart,
    // Auth values
    isLoggedIn, setIsLoggedIn,
    userName, setUserName,
    userRole, setUserRole,
    login,
    logout
  }


  return (
    <context.Provider value={values}>
      {children}
    </context.Provider>
  )
};
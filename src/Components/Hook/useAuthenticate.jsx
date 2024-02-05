// Custom hook for checking authentication
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {zerop0} from '../../apiConfig'

const useAuthentication = ({ failNavigateTo = null, successNavigateTo = null, dependencies = [] } = {}) => {      // this is how a default object value is passed : if nothing passed, then default object is empty {}, then default values are applied (I dont know how)
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userObj, setuserObj] = useState(null);
  const navigate = useNavigate()
  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        failNavigateTo && navigate(`${failNavigateTo}`, { replace: true })
        return;
      }

      const response = await axios.get(`${zerop0}/protected`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      })
      setAuthenticated(true);
      setuserObj(response.data.user);
      successNavigateTo && navigate(`${successNavigateTo}`, { replace: true })
    } catch (error) {
      console.error('riziuzi: Authentication failed:', error);
      failNavigateTo && navigate(`${failNavigateTo}`, { replace: true })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, dependencies); // Runs once when the component mounts if the dependency is empty ???????????????????? But why needed?????
  return { authenticated, loading, userObj };
};

export default useAuthentication;

import axios from 'axios';
import { toast } from 'react-toastify';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL + 'api' || 'http://localhost:5000/api',
});

const createHero = async heroData => {
  try {
    const response = await $host.post('/heroes', heroData);
    toast.info('Hero created:', response.data);
  } catch (error) {
    console.error(
      'Error creating hero:',
      error.response ? error.response.data : error.message,
    );
    toast.error(
      'Error creating hero:',
      error.response ? error.response.data : error.message,
    );
  }
};

const getAllHeroes = async (page = 1, limit = 5) => {
  try {
    const response = await $host.get('/heroes', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching heroes:',
      error.response ? error.response.data : error.message,
    );
    toast.error(
      'Error fetching heroes:',
      error.response ? error.response.data : error.message,
    );
  }
};

const getHeroById = async id => {
  try {
    const response = await $host.get(`/heroes/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching hero:',
      error.response ? error.response.data : error.message,
    );
    toast.error(
      'Error fetching hero:',
      error.response ? error.response.data : error.message,
    );
  }
};

const updateHero = async (updatedData, id) => {
  try {
    const response = await $host.patch(`/heroes/${id}`, updatedData);
    toast.info('Hero updated:', response.data);
  } catch (error) {
    console.error(
      'Error updating hero:',
      error.response ? error.response.data : error.message,
    );
    toast.error(
      'Error updating hero:',
      error.response ? error.response.data : error.message,
    );
  }
};

const deleteHero = async id => {
  try {
    const response = await $host.delete(`/heroes/${id}`);
    console.log('Hero deleted:', response.data);
    toast.info(`Hero deleted`, response.data);
  } catch (error) {
    console.error(
      'Error deleting hero:',
      error.response ? error.response.data : error.message,
    );
    toast.error(
      'Error deleting hero:',
      error.response ? error.response.data : error.message,
    );
  }
};

export { createHero, getAllHeroes, getHeroById, updateHero, deleteHero };

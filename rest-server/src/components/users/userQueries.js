import { globalQueryHelper } from '../../lib/utils/queryHelpers';

import {
  addClientNonUserHelper,
  fetchAllClientNonUserHelper, 
  fetchAllUserHelper,
  fetchUserHelper,
  addUserPictureHelper,
  fetchAllTrainersHelper,
  addTrainerRequestHelper,
  fetchTrainerRequestInQueryHelper,
  fetchTrainerRequestOutQueryHelper,
  deleteTrainerRequestQueryHelper,
  addTrainerClientConnectionQueryHelper,
  fetchClientQueryHelper,
  fetchUserClientsQueryHelper
} from './userSQLHelpers';

export const fetchClientsQuery = async (payload) => {
  const nonUsers = await globalQueryHelper(payload, fetchAllClientNonUserHelper, 'fetchAllClientNonUserHelper', ['trainer_id']);
  const users = await globalQueryHelper(payload, fetchUserClientsQueryHelper, 'fetchUserClientsQueryHelper', ['trainer_id']);
  let i = 0;
  while (i < nonUsers.rows.length) {
    users.rows.push(nonUsers.rows[i]);
    i++;
  }
  return users;
};

export const addClientNonUserQuery = async (payload) => {
  return await globalQueryHelper(payload, addClientNonUserHelper, 'addClientNonUserController', ['client_name', 'trainer_id']);
};

export const userQuery = async (payload, url) => {
  if (url === '/') {
    return await globalQueryHelper(payload, fetchAllUserHelper, 'fetchAllUserHelper', []);
  }
};

export const userAddPictureQuery = async (payload, url) => {
  if(url.split('/')[2] === 'picture'){
    return await globalQueryHelper(payload, addUserPictureHelper, 'fetchAllUserHelper', ['userId', 'pictureUrl']);
  }
}

export const fetchAllTrainersQuery = async (payload) => {
  return await globalQueryHelper(payload, fetchAllTrainersHelper, 'fetchAllTrainersController', []);
};

export const addTrainerRequestQuery = async (payload) => {
  return await globalQueryHelper(payload, addTrainerRequestHelper, 'addTrainerRequestHelper', ['client_id', 'trainer_id']);
};

export const fetchTrainerRequestInQuery = async (payload) => {
  return await globalQueryHelper(payload, fetchTrainerRequestInQueryHelper, 'fetchTrainerRequestInQueryHelper', ['trainer_id']);
};

export const fetchTrainerRequestOutQuery = async (payload) => {
  return await globalQueryHelper(payload, fetchTrainerRequestOutQueryHelper, 'fetchTrainerRequestOutQueryHelper', ['client_id']);
};

export const deleteTrainerRequestQuery = async (payload) => {
  return await globalQueryHelper(payload, deleteTrainerRequestQueryHelper, 'deleteTrainerRequestQueryHelper', ['client_id', 'trainer_id']);
};

export const addTrainerClientConnectionQuery = async (payload) => {
  return await globalQueryHelper(payload, addTrainerClientConnectionQueryHelper, 'addTrainerClientConnectionQueryHelper', ['client_id', 'trainer_id']);
};

export const fetchClientQuery = async (payload) => {
  return await globalQueryHelper(payload, fetchClientQueryHelper, 'fetchClientQueryHelper', ['client_id']);
};
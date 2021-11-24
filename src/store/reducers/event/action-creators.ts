import { EventActionEnum, SetEventsAction, SetGuestsAction } from './types';
import { IEvent } from '../../../models/IEvent';
import { IUser } from '../../../models';
import { AppDispatch } from '../../index';
import UserService from '../../../api/UserService';

export const EventActionCreators = {
  setEvents: (payload: IEvent[]): SetEventsAction => ({
    type: EventActionEnum.SET_EVENTS, payload,
  }),
  setGuests: (payload: IUser[]): SetGuestsAction => ({
    type: EventActionEnum.SET_GUESTS, payload,
  }),
  fetchGuests: () => async (dispatch: AppDispatch) => {
    try {
      const {data} = await UserService.getUsers();
      dispatch(EventActionCreators.setGuests(data));
    } catch (err) {
      console.error(err);
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];

      json.push(event);
      dispatch(EventActionCreators.setEvents(json));
      localStorage.setItem('events', JSON.stringify(json));
    } catch (err) {
      console.error(err);
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]';
      const json = JSON.parse(events) as IEvent[];
      const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username);

      dispatch(EventActionCreators.setEvents(currentUserEvents));
    } catch (err) {
      console.error(err);
    }
  }
}
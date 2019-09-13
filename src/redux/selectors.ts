import { createSelector, Selector } from "reselect";
import { Message, User } from "../types";
import { NotificationState, State } from "./reducer";
import { isMessageSameDay, isMessageSameUser } from "../util";

export const getMessages: Selector<State, Message[]> = state => state.messages;
export const getLoggedUser: Selector<State, User> = state => state.loggedUser;
export const getNotification: Selector<State, NotificationState> = state =>
  state.notification;
export const getIsMessagesEnd: Selector<State, boolean> = state =>
  state.isMessagesEnd;
export const getAreMessagesInitFetched: Selector<State, boolean> = state =>
  state.areMessagesInitFetched;

export const getTimeBlocks = createSelector<State, Message[], Message[][]>(
  getMessages,
  messages => {
    if (messages.length === 0) return [];

    const timeBlocks = [];
    let currentTimeBlock = [];

    // @ts-ignore
    for (const [idx, m] of messages.entries()) {
      const lastM = messages[idx - 1];

      // start of new time block
      if (!isMessageSameDay(m, lastM)) {
        if (currentTimeBlock.length > 0) {
          timeBlocks.push(currentTimeBlock);
          currentTimeBlock = [];
        }
        currentTimeBlock.push(m);
      }
      // same block
      else {
        currentTimeBlock.push(m);
      }
    }

    if (currentTimeBlock.length > 0) {
      timeBlocks.push(currentTimeBlock);
      currentTimeBlock = [];
    }

    return timeBlocks;
  }
);

export const getMessageBlocks = createSelector(
  getTimeBlocks,
  timeBlocks => {
    return timeBlocks.map(tb => {
      const newTimeBlock = [];
      let currentUserBlock = [];

      // @ts-ignore
      for (const [idx, m] of tb.entries()) {
        const lastM = tb[idx - 1];

        if (!isMessageSameUser(m, lastM)) {
          if (currentUserBlock.length > 0) {
            newTimeBlock.push(currentUserBlock);
            currentUserBlock = [];
          }
          currentUserBlock.push(m);
        } else {
          currentUserBlock.push(m);
        }
      }

      if (currentUserBlock.length > 0) {
        newTimeBlock.push(currentUserBlock);
        currentUserBlock = [];
      }

      return newTimeBlock;
    });
  }
);

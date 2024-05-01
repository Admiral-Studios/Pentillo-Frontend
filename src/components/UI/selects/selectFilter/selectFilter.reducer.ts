import { IAction, ISelectFilterState } from './selectFilter.types'

const selectFilterInitialState: ISelectFilterState = {
  options: [],
  isOpen: false,
  selectedOptions: {},
}

const selectFilterReducer = (
  state: ISelectFilterState = selectFilterInitialState,
  action: IAction
) => {
  switch (action.type) {
    case SET_CHILD_OPTION_ACTIVE: {
      const changedOptions = state.options.map((parentOption) =>
        parentOption.id === action.payload.parentOptionId
          ? parentOption.options?.map((childOption) =>
              childOption.id === action.payload.childOptionId
                ? { ...childOption, isActive: !childOption.isActive }
                : childOption
            )
          : parentOption
      )

      return {
        ...state,
        options: changedOptions,
      }
    }
    case SET_RANGE: {
      const changedRange = state.options.map((parentOption) =>
        parentOption.id === action.payload.parentOptionId
          ? {
              ...parentOption,
              max: action.payload.max,
              min: action.payload.min,
            }
          : parentOption
      )

      return {
        ...state,
        options: changedRange,
      }
    }

    case SET_PARENT_OPTION_ACTIVE: {
      const optionsWithActive = state.options.map((parentOption) =>
        parentOption.id === action.payload.parentOptionId
          ? { ...parentOption, isOpen: !parentOption.isOpen }
          : parentOption
      )

      return {
        state,
        options: optionsWithActive,
      }
    }

    case OPEN_POPUP: {
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    }

    case SET_OPTIONS: {
      return {
        ...state,
        options: action.payload,
      }
    }

    case TOGGLE_ACCORDION: {
      const changedStateOpen = state.options.map((parentOption) =>
        parentOption.id === action.payload
          ? { ...parentOption, isOpen: !parentOption.isOpen }
          : parentOption
      )

      return {
        ...state,
        options: changedStateOpen,
      }
    }

    case SET_SELECTED_OPTIONS: {
      const changeOptions = state.options.map((parentOption) =>
        parentOption.id === action.payload.parentOptionId
          ? {
              ...parentOption,
              selectedOptions: action.payload.parentOptionValues,
            }
          : parentOption
      )

      return {
        ...state,
        options: changeOptions,
      }
    }

    case REMOVE_SELECTED_OPTIONS: {
      const changeOptions = state.options.map((parentOption) =>
        parentOption.id === action.payload.parentOptionId
          ? {
              ...parentOption,
              selectedOptions: parentOption.selectedOptions?.filter(
                (selectedOption) =>
                  selectedOption.id !== action.payload.selectedOptionId
              ),
            }
          : parentOption
      )

      return {
        ...state,
        options: changeOptions,
      }
    }

    default: {
      return state
    }
  }
}

const SET_PARENT_OPTION_ACTIVE = 'SET_PARENT_OPTION_ACTIVE'
const SET_CHILD_OPTION_ACTIVE = 'SET_CHILD_OPTION_ACTIVE'
const SET_RANGE = 'SET_RANGE'
const SET_SELECTED_OPTIONS = 'SET_SELECTED_OPTIONS'
const REMOVE_SELECTED_OPTIONS = 'REMOVE_SELECTED_OPTIONS'
const OPEN_POPUP = 'OPEN_POPUP'
const TOGGLE_ACCORDION = 'TOGGLE_ACCORDION'
const SET_OPTIONS = 'SET_OPTIONS'

export {
  OPEN_POPUP,
  REMOVE_SELECTED_OPTIONS,
  SET_CHILD_OPTION_ACTIVE,
  SET_OPTIONS,
  SET_PARENT_OPTION_ACTIVE,
  SET_RANGE,
  SET_SELECTED_OPTIONS,
  TOGGLE_ACCORDION,
  selectFilterInitialState,
}

export default selectFilterReducer

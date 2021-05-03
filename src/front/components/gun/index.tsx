import * as React from 'react'

import { useAppDispatch, useAppSelector } from '$front/hooks'
import { actions } from '$front/store/slices'
import { GunPartKeys } from '$common/types'

import { GunView } from './Gun'

interface GunState<P extends GunPartKeys> {
  xray: boolean
  exploded: boolean
  shouldAnimate: boolean
  reverseAnimation: boolean
  selectedPart: P | null
}

const initialState = <P extends GunPartKeys>(): GunState<P> => ({
  xray: false,
  exploded: false,
  shouldAnimate: false,
  reverseAnimation: false,
  selectedPart: null
})

export const Gun: React.FunctionComponent = () => {
  const gun = useAppSelector(state => state.gun.currentGun)
  const parts = useAppSelector(state => state.gun.parts)

  const dispatch = useAppDispatch()
  const [state, setState] = React.useState<GunState<keyof typeof gun.parts>>(initialState)

  const onPartChange = React.useCallback((partKey: keyof typeof gun.parts) => (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const key = event.currentTarget.value
    setState({ ...state, shouldAnimate: false })

    if (!!gun.parts[partKey][key]) {
      dispatch(actions.setPart([partKey, gun.parts[partKey][key]]))
    }
  }, [dispatch, gun, state])

  const onPartSelect = React.useCallback((key: keyof typeof gun.parts | null) => () => {
    setState({
      ...state,
      shouldAnimate: false,
      selectedPart: key
    })
  }, [dispatch, gun, state])

  const toggleXray = React.useCallback(() => {
    setState({
      ...state,
      xray: !state.xray,
      shouldAnimate: false
    })
  }, [setState, state])

  const toggleExploded = React.useCallback(() => {
    setState({
      ...state,
      exploded: !state.exploded,
      shouldAnimate: true,
      reverseAnimation: state.exploded === true
    })
  }, [setState, state])

  return (
    <GunView
      gun={gun}
      parts={parts}
      xray={state.xray}
      exploded={state.exploded}
      selectedPart={state.selectedPart}
      shouldAnimate={state.shouldAnimate}
      reverseAnimation={state.reverseAnimation}
      toggleXray={toggleXray}
      selectPart={onPartSelect}
      onPartChange={onPartChange}
      toggleExploded={toggleExploded}
    />
  )
}

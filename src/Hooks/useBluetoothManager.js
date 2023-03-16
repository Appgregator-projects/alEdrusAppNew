import React, { useEffect, useMemo, useState } from 'react'
import { BleManager } from 'react-native-ble-plx';

export const useBluetoothManager = () => {
    const Manager = useMemo(() => new BleManager(), []);
  return Manager;
}


export const useBluetoothState = () => {
	const [bluetoothState, setBluetoothState] = useState(false);

  const Manager = useBluetoothManager();

  const handleStatusBluetooth = () => {
		Manager.onStateChange((state) => {
		console.log(state, 'state')
			if (state === 'PoweredOn') {
				setBluetoothState(true)
			}
			if (state === 'PoweredOff') {
				setBluetoothState(false)
			}
		}, true)
	};
	useEffect(() => {
		handleStatusBluetooth()

		return () => {
		Manager.destroy()
		}
	}, [])

  return bluetoothState;
}
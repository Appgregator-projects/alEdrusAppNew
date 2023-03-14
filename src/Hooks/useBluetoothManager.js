import React, { useMemo } from 'react'
import { BleManager } from 'react-native-ble-plx';

export const useBluetoothManager = () => {
    const Manager = useMemo(() => new BleManager(), []);
  return Manager
}

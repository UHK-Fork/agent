import {UhkBuffer} from '../UhkBuffer';
import {keyActionType, KeyActionId, KeyAction} from './KeyAction';
import {assertUInt8} from '../assert';

export enum KeyModifiers {
    leftCtrl   = 1 << 0,
    leftShift  = 1 << 1,
    leftAlt    = 1 << 2,
    leftGui    = 1 << 3,
    rightCtrl  = 1 << 4,
    rightShift = 1 << 5,
    rightAlt   = 1 << 6,
    rightGui   = 1 << 7
}

export class KeystrokeModifiersAction extends KeyAction {

    @assertUInt8
    modifierMask: number;

    _fromJsObject(jsObject: any): KeystrokeModifiersAction {
        this.assertKeyActionType(jsObject);
        this.modifierMask = jsObject.modifierMask;
        return this;
    }

    _fromBinary(buffer: UhkBuffer): KeystrokeModifiersAction {
        this.readAndAssertKeyActionId(buffer);
        this.modifierMask = buffer.readUInt8();
        return this;
    }

    _toJsObject(): any {
        return {
            keyActionType: keyActionType.KeystrokeModifiersAction,
            modifierMask: this.modifierMask
        };
    }

    _toBinary(buffer: UhkBuffer) {
        buffer.writeUInt8(KeyActionId.KeystrokeModifiersAction);
        buffer.writeUInt8(this.modifierMask);
    }

    toString(): string {
        return `<KeystrokeModifiersAction modifierMask="${this.modifierMask}">`;
    }

    isModifierActive(modifier: KeyModifiers): boolean {
        return (this.modifierMask & modifier) > 0;
    }

    isOnlyOneModifierActive(): boolean {
        return this.modifierMask !== 0 && !(this.modifierMask & this.modifierMask - 1);
    }
}

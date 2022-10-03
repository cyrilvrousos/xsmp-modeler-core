/**
 * *******************************************************************************
 * * Copyright (C) 2020-2022 THALES ALENIA SPACE FRANCE.
 * *
 * * All rights reserved. This program and the accompanying materials
 * * are made available under the terms of the Eclipse Public License 2.0
 * * which accompanies this distribution, and is available at
 * * https://www.eclipse.org/legal/epl-2.0/
 * *
 * * SPDX-License-Identifier: EPL-2.0
 * ******************************************************************************
 */
package org.eclipse.xsmp.smp.core.types;


/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>UInt8 Value</b></em>'.
 * <!-- end-user-doc -->
 *
 * <!-- begin-model-doc -->
 * A UInt8Value holds a value for an item of type UInt8.
 * <!-- end-model-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.eclipse.xsmp.smp.core.types.UInt8Value#getValue <em>Value</em>}</li>
 * </ul>
 *
 * @see org.eclipse.xsmp.smp.core.types.TypesPackage#getUInt8Value()
 * @model extendedMetaData="name='UInt8Value' kind='empty'"
 * @generated
 */
public interface UInt8Value extends SimpleValue
{
	/**
	 * Returns the value of the '<em><b>Value</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * <!-- begin-model-doc -->
	 * Value of type UInt8.
	 * <!-- end-model-doc -->
	 * @return the value of the '<em>Value</em>' attribute.
	 * @see #isSetValue()
	 * @see #unsetValue()
	 * @see #setValue(short)
	 * @see org.eclipse.xsmp.smp.core.types.TypesPackage#getUInt8Value_Value()
	 * @model unsettable="true" dataType="org.eclipse.emf.ecore.xml.type.UnsignedByte" required="true"
	 *        extendedMetaData="kind='attribute' name='Value'"
	 * @generated
	 */
	short getValue();

	/**
	 * Sets the value of the '{@link org.eclipse.xsmp.smp.core.types.UInt8Value#getValue <em>Value</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Value</em>' attribute.
	 * @see #isSetValue()
	 * @see #unsetValue()
	 * @see #getValue()
	 * @generated
	 */
	void setValue(short value);

	/**
	 * Unsets the value of the '{@link org.eclipse.xsmp.smp.core.types.UInt8Value#getValue <em>Value</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #isSetValue()
	 * @see #getValue()
	 * @see #setValue(short)
	 * @generated
	 */
	void unsetValue();

	/**
	 * Returns whether the value of the '{@link org.eclipse.xsmp.smp.core.types.UInt8Value#getValue <em>Value</em>}' attribute is set.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return whether the value of the '<em>Value</em>' attribute is set.
	 * @see #unsetValue()
	 * @see #getValue()
	 * @see #setValue(short)
	 * @generated
	 */
	boolean isSetValue();

} // UInt8Value

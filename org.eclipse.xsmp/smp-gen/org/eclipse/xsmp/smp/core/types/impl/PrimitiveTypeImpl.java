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
package org.eclipse.xsmp.smp.core.types.impl;

import org.eclipse.emf.ecore.EClass;

import org.eclipse.xsmp.smp.core.types.PrimitiveType;
import org.eclipse.xsmp.smp.core.types.TypesPackage;

/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Primitive Type</b></em>'.
 * <!-- end-user-doc -->
 *
 * @generated
 */
public class PrimitiveTypeImpl extends SimpleTypeImpl implements PrimitiveType
{
	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected PrimitiveTypeImpl()
	{
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass()
	{
		return TypesPackage.Literals.PRIMITIVE_TYPE;
	}

} //PrimitiveTypeImpl

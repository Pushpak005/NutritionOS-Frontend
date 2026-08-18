package com.nutritionos.app

import android.content.Context

import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.StepsRecord

class HealthConnectBridge(context: Context) {

    private val healthConnectClient =
        HealthConnectClient.getOrCreate(context)

    private val permissions: Set<String> =
        setOf(
            HealthPermission.getReadPermission(
                StepsRecord::class
            )
        )

    fun getHealthConnectClient(): HealthConnectClient {
        return healthConnectClient
    }

    fun getRequiredPermissions(): Set<String> {
        return permissions
    }

    fun createPermissionContract() =
        PermissionController.createRequestPermissionResultContract()
}
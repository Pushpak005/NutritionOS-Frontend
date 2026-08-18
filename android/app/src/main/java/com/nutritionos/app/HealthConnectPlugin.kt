package com.nutritionos.app

import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.StepsRecord
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.PluginMethod

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

import java.time.Instant
import java.time.ZoneOffset

@CapacitorPlugin(name = "HealthConnect")
class HealthConnectPlugin : Plugin() {

    private lateinit var healthConnectClient: HealthConnectClient

    private val permissions = setOf(
        HealthPermission.getReadPermission(
            StepsRecord::class
        )
    )

    override fun load() {
        healthConnectClient =
            HealthConnectClient.getOrCreate(context)
    }

    @PluginMethod
    fun requestHealthPermissions(call: PluginCall) {

        val launcher =
            bridge.activity.registerForActivityResult(
                PermissionController.createRequestPermissionResultContract()
            ) { grantedPermissions ->

                val result = JSObject()

                result.put(
                    "granted",
                    grantedPermissions.containsAll(permissions)
                )

                call.resolve(result)
            }

        launcher.launch(permissions)
    }

    @PluginMethod
    fun getSteps(call: PluginCall) {

        CoroutineScope(Dispatchers.IO).launch {

            try {

                val now = Instant.now()

                val startOfDay =
                    now
                        .atZone(ZoneOffset.systemDefault())
                        .toLocalDate()
                        .atStartOfDay(
                            ZoneOffset.systemDefault()
                        )
                        .toInstant()

                val response =
                    healthConnectClient.readRecords(
                        ReadRecordsRequest(
                            StepsRecord::class,
                            timeRangeFilter =
                                TimeRangeFilter.between(
                                    startOfDay,
                                    now
                                )
                        )
                    )

                var totalSteps = 0L

                for (record in response.records) {
                    totalSteps += record.count
                }

                val result = JSObject()

                result.put(
                    "steps",
                    totalSteps
                )

                call.resolve(result)

            } catch (e: Exception) {

                call.reject(
                    "Unable to read Health Connect steps",
                    e
                )
            }
        }
    }
}
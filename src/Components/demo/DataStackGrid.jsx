"use client";

import {
    FiDatabase,
    FiShield,
    FiZap,
    FiCheckCircle,
    FiLock,
    FiActivity,
    FiServer,
} from "react-icons/fi";
import {
    SiSnowflake,
    SiDatabricks,
    SiGooglebigquery,
    SiPostgresql,
    SiMongodb,
} from "react-icons/si";

export default function DataStackGrid() {
    return (
        <section className="relative w-full bg-white font-sans text-black py-20 px-6 sm:px-10 lg:px-14 overflow-hidden">
            {/* Dot Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-medium tracking-[0.2em] text-black uppercase">
                        Under the Hood
                    </span>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black leading-[1.15]">
                        Built to fit your existing stack
                    </h2>
                    <p className="mt-4 text-base text-black font-light leading-relaxed">
                        ZeroQueries plugs into your warehouses, CRMs, and documents — no
                        data duplication, no pipeline rebuilds.
                    </p>
                </div>

                {/* Three Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 — Data Stack */}
                    <div className="flex flex-col p-6 rounded-2xl bg-gray-50 border border-gray-200">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 text-black mb-4">
                            <FiDatabase className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-medium text-black tracking-tight">
                            Custom Live Demo on Your Stack
                        </h3>
                        <p className="mt-1.5 text-sm text-black font-light leading-relaxed">
                            Test natural language queries live across schemas, tables, Gong
                            call transcripts, and PDF contracts.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-black px-2.5 py-1 rounded-md text-xs font-normal">
                                <SiSnowflake className="h-3.5 w-3.5" />
                                Snowflake
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-black px-2.5 py-1 rounded-md text-xs font-normal">
                                <SiDatabricks className="h-3.5 w-3.5" />
                                Databricks
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-black px-2.5 py-1 rounded-md text-xs font-normal">
                                <SiGooglebigquery className="h-3.5 w-3.5" />
                                BigQuery
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-black px-2.5 py-1 rounded-md text-xs font-normal">
                                <SiPostgresql className="h-3.5 w-3.5" />
                                PostgreSQL
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-black px-2.5 py-1 rounded-md text-xs font-normal">
                                <SiMongodb className="h-3.5 w-3.5" />
                                MongoDB
                            </span>
                        </div>
                    </div>

                    {/* Card 2 — Security */}
                    <div className="flex flex-col p-6 rounded-2xl bg-gray-50 border border-gray-200">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 text-black mb-4">
                            <FiShield className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-medium text-black tracking-tight">
                            Enterprise Security &amp; Compliance
                        </h3>
                        <p className="mt-1.5 text-sm text-black font-light leading-relaxed">
                            Zero-training data retention guarantee, customer-managed
                            encryption keys, and private VPC deployment options.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-1.5 text-xs text-black font-normal">
                                <FiCheckCircle className="h-3.5 w-3.5 shrink-0" />
                                SOC 2 Type II
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-black font-normal">
                                <FiCheckCircle className="h-3.5 w-3.5 shrink-0" />
                                HIPAA Ready
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-black font-normal">
                                <FiLock className="h-3.5 w-3.5 shrink-0" />
                                End-to-End Encryption
                            </span>
                        </div>
                    </div>

                    {/* Card 3 — Performance */}
                    <div className="flex flex-col p-6 rounded-2xl bg-gray-50 border border-gray-200">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-200 text-black mb-4">
                            <FiZap className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-medium text-black tracking-tight">
                            Zero Pipeline Maintenance
                        </h3>
                        <p className="mt-1.5 text-sm text-black font-light leading-relaxed">
                            Eliminate fragile SQL views, static dbt pipeline overhead, and
                            manual dashboard rebuilds forever.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-1.5 text-xs text-black font-normal">
                                <FiActivity className="h-3.5 w-3.5 shrink-0" />
                                Sub-second Query Speed
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-black font-normal">
                                <FiServer className="h-3.5 w-3.5 shrink-0" />
                                Direct In-Warehouse Compute
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
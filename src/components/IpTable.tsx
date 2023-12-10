import React from 'react';

const IpTable: React.FC<{ ipAddress: string; clickRecords: Record<string, Date> }> = ({ ipAddress, clickRecords }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="px-4 py-2">Adresse IP {": " + ipAddress}</th>
                        <th className="px-4 py-2">Date et heure</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(clickRecords).map(([ip, timestamp]) => (
                        <tr key={ip}>
                            <td className="border px-4 py-2">{ip}</td>
                            <td className="border px-4 py-2">
                                {timestamp.toDateString() + " " + timestamp.toLocaleTimeString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IpTable;

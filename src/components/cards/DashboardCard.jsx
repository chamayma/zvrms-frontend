function DashboardCard({

    title,

    value,

    icon,

    color = "primary"

}) {

    return (

        <div className="col-lg-3 col-md-6 mb-4">

            <div className="dashboard-card">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <div className="card-title">

                            {title}

                        </div>

                        <div className="card-number">

                            {value}

                        </div>

                    </div>

                    <div
                        className={`card-icon text-${color}`}
                    >

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;
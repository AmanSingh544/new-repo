import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./computation.scss"
import { Sidetable } from './side-table';
import routeNames from 'src/constants/routeNames';
import { useTranslation } from 'react-i18next';

export const Computation = () => {
    const naviagte = useNavigate()
    const { t } = useTranslation();

    const scopeRouteHandler = (routeName) => {
        naviagte(routeNames.scope, { state: { routeName } })

    }

    const imgConst = "https://carbnonx.blob.core.windows.net/carbnonx/"


    const moveToScopeDetails = (data) => {

        if (data.scope) {
            localStorage.setItem("alertComputation", true)
            naviagte(routeNames.scope, {
                state: {
                    routeName: data.scope - 1,
                    alertstate: { data }
                }
            })
        }
    }
    return (


        <div className='computation-main-container'>

            <div className='scope-circle-div'>
                <div className='circle-div-text'>
                    {t("computationLogic")}
                </div>
                <div className='scope-Cocircle' style={{ minHeight: "500px" }} >
                    <div className='co-circle' >
                        <div className='Circle-Co'>
                            <p className='circle-head' >CO<sub>2</sub></p>
                            <p className='circle-subhead' >{t("emission")}</p>
                        </div>
                    </div>
                    {/* <i class="fa-solid fa-angle-down child1-end" style={{ color: 'gray' }}></i>
                    <i class="fa-solid fa-angle-down child2-end" style={{ color: 'gray' }}></i>
                    <i class="fa-solid fa-angle-down child3-end" style={{ color: 'gray' }}></i>
                    <div className='src-child1'></div>
                    <div className='src-child1-end'></div>
                    <div className='src-child2'></div>
                    <div className='src-child3'></div>
                    <div className='src-child3-end'></div> */}
                    <div className='circle-div' >
                        <div className='ScopeC circle1 scope1' onClick={() => scopeRouteHandler(0)}  >
                            <p className='circle-head' >{t("scope1")}</p>
                            <p className='circle-subhead' >{t("viewComputationMethod")}</p>
                            <img src={`${imgConst}ArrowComp.svg`} alt="Your SVG" />
                        </div>
                        <div className='ScopeC circle1 scope2' onClick={() => scopeRouteHandler(1)}  >
                            <p className='circle-head' >{t("scope2")}</p>
                            <p className='circle-subhead' >{t("viewComputationMethod")}</p>
                            <img src={`${imgConst}ArrowComp.svg`} alt="Your SVG" />
                        </div>
                        <div className='ScopeC circle1 scope3' onClick={() => scopeRouteHandler(2)} >
                            <p className='circle-head' >{t("scope3")}</p>
                            <p className='circle-subhead' >{t("viewComputationMethod")}</p>
                            <img src={`${imgConst}ArrowComp.svg`} alt="Your SVG" />
                        </div>
                    </div>
                </div>
            </div>
            <Sidetable moveToScopeDetails={moveToScopeDetails} />
        </div>
    )
}
